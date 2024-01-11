import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useState } from 'react';

import {
  AltHeader,
  Container,
  Divider,
  SearchInput,
  SectionCard,
  Text,
} from 'components';
import { BillRoutes, StackNavigationProps } from 'navigation';
import { useGetBillersCategoryQuery } from 'service';
import { layout } from 'constant';

export default function BillerCategory({
  navigation,
  route,
}: StackNavigationProps<BillRoutes, 'BillerCategory'>): JSX.Element {
  const { params } = route;
  const [search, setSearch] = useState('');
  const { isLoading, isFetching, data, refetch, isError } = useGetBillersCategoryQuery({
    categoryId: params.categoryId,
  });

  return (
    <View style={styles.container}>
      <AltHeader label={params.categoryName} />
      <Container>
        <FlatList
          data={
            data?.data.filter(i =>
              i.billername.toLowerCase().includes(search.toLowerCase()),
            ) || []
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
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                refetch();
              }}
              refreshing={isLoading || isFetching}
            />
          }
          ItemSeparatorComponent={() => <Divider />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <SectionCard
                item={{
                  title: item.billername,
                }}
                onPress={() => {
                  const fields = {
                    fieldLabel: item.customerfield1,
                    fieldName: 'customerId',
                  };
                  navigation.navigate('BillerDetails', {
                    bill: item.billername,
                    billerId: item.billerid,
                    fields: fields,
                    type:
                      params.categoryId === '3' ? 3 : params.categoryId === '4' ? 3 : 4,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
