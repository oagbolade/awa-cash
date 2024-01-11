import { useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { AltHeader, Container, Divider, Text, VirtualScroll } from 'components';
import { useGetBeneficiariesQuery, useService } from 'service';
import { layout, pallets } from 'constant';
import { StackNavigationProps, TransferRoutes } from 'navigation';
import { useTheme } from 'hooks';
import { Icon } from 'assets';

const { spacing, input } = layout;

export default function Beneficiary({
  navigation,
}: StackNavigationProps<TransferRoutes, 'Beneficiary'>): JSX.Element {
  const [search, setSearch] = useState('');
  const { error, isError, isLoading, isSuccess, data } = useGetBeneficiariesQuery();
  const { color } = useTheme();

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
  });

  return (
    <>
      <AltHeader label="Beneficiaries" />
      <VirtualScroll>
        <Container>
          <View style={[styles.search, { backgroundColor: color.input }]}>
            <TextInput
              // onFocus={() => console.log('Focused')}
              style={[styles.input, { color: color.text }]}
              placeholder="Search"
              placeholderTextColor={pallets.grey2}
              value={search}
              onChangeText={text => setSearch(text)}
            />
          </View>
          <Divider />
          <FlatList
            data={
              data?.data.filter(item =>
                item?.accountName?.toLowerCase()?.includes(search?.toLowerCase()),
              ) || []
            }
            ItemSeparatorComponent={() => <Divider space="s" />}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (item.beneficaryType === 1) {
                      navigation.navigate('AwacashSelectAccount', {
                        beneficiary: {
                          accountNumber: item.accountNumber,
                          name: item.accountName,
                        },
                      });
                    } else {
                      navigation.navigate('BankSelectAccount', {
                        beneficiary: {
                          accountNumber: item.accountNumber,
                          bankCode: item?.bankCode || '',
                          bankName: item.bankName,
                          name: item.accountName,
                        },
                        // beneficiary: {
                        //   accountNumber: '0112345678',
                        //   bankCode: '999998',
                        //   bankName: item.bankName,
                        //   name: item.accountName,
                        // },
                      });
                    }
                  }}
                  style={[
                    styles.row,
                    styles.container,
                    { backgroundColor: color.altBG, justifyContent: 'space-between' },
                  ]}>
                  <View style={styles.row}>
                    <View style={styles.iconBox}>
                      <Icon name="profile-circle" color={pallets.primary} />
                    </View>
                    <View>
                      <Text>{item.accountName}</Text>
                      <Divider space="t" />
                      <Text>{item.accountNumber}</Text>
                    </View>
                  </View>
                  <View>
                    <Text>{item.bankName}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </Container>
      </VirtualScroll>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: pallets.border2,
    borderRadius: 8,
    borderWidth: 0.2,
    elevation: 2,
    padding: 8,
    paddingVertical: 16,
    shadowColor: pallets.grey3,
    shadowOffset: {
      height: spacing.s / 2,
      width: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: spacing.s / 2,
  },
  iconBox: {
    alignItems: 'center',
    backgroundColor: pallets.transparentBlue,
    borderRadius: 40,
    height: 32,
    justifyContent: 'center',
    marginRight: 10,
    width: 32,
  },
  input: {
    fontFamily: 'DMSansMedium',
    height: '100%',
    padding: 8,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  search: {
    borderRadius: input.inputRadius,
    height: input.height,
  },
});
