import { FlatList, RefreshControl, View } from 'react-native';
import { useState } from 'react';

import {
  AltHeader,
  Container,
  Divider,
  SearchInput,
  SectionCard,
  Text,
} from 'components';
import { useGetBillersQuery } from 'service';
import { layout } from 'constant';
import { BillRoutes, StackNavigationProps } from 'navigation';

export default function Biller({
  navigation,
}: StackNavigationProps<BillRoutes, 'Biller'>): JSX.Element {
  const { isFetching, isLoading, refetch, data, isError } = useGetBillersQuery();
  const [search, setSearch] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <AltHeader label="Pay Bills" />
      <Container>
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                refetch();
              }}
              refreshing={isLoading || isFetching}
            />
          }
          ListHeaderComponent={
            <SearchInput
              onChangeText={text => setSearch(text)}
              value={search}
              placeholder="Search Bills"
              marginBottom={20}
            />
          }
          ListEmptyComponent={() => (
            <>
              {isError && (
                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    height: layout.window.height * 0.8,
                    justifyContent: 'center',
                  }}>
                  <Text textAlign="center">
                    Something went wrong fetching data. Please try again
                  </Text>
                </View>
              )}
            </>
          )}
          data={
            data?.data.categorys.filter(i =>
              i.categoryname.toLowerCase().includes(search.toLowerCase()),
            ) || []
          }
          ItemSeparatorComponent={() => <Divider />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <SectionCard
                item={{
                  title: item.categoryname,
                }}
                onPress={() => {
                  console.log(item);
                  navigation.navigate('BillerCategory', {
                    categoryId: item.categoryid,
                    categoryName: item.categoryname,
                    description: item.categorydescription,
                  });
                }}
              />
            );
          }}
        />
      </Container>
    </View>
  );
}
