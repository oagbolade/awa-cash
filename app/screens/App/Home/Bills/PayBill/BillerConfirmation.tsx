import { StyleSheet, View } from 'react-native';

import { BillRoutes, StackNavigationProps } from 'navigation';
import {
  AltHeader,
  Button,
  Container,
  Divider,
  ListItem,
  Separator,
  Text,
} from 'components';
import { layout, pallets } from 'constant';
import { abbreviateString, formatCurrency } from 'utils';
import { useGetTransferFeeQuery } from 'service';

const { spacing, fonts } = layout;

export default function BillerConfirmation({
  navigation,
  route,
}: StackNavigationProps<BillRoutes, 'BillerConfirmation'>): JSX.Element {
  const { params } = route;
  const feeQuery = useGetTransferFeeQuery({
    amount: (Number(params.amount) || 0) / 100,
    type: params.type,
  });

  console.log(params.paymentCode);

  const airtime = params.type === 3;

  return (
    <>
      <AltHeader label="Confirmation" />
      <Container>
        <Divider />
        <Text color={pallets.grey2}>Payment to:</Text>
        <Divider />
        <View style={styles.row}>
          <View style={styles.accountAbbr}>
            <Text textTransform="uppercase" variant="medium-500" color={pallets.white}>
              {abbreviateString(params.fullName)}
            </Text>
          </View>
          <View>
            <Text variant="medium-500">{params.fullName}</Text>
            <Divider space="t" />
            <Text size={fonts.caption1} color={pallets.grey2}>
              {params.label} {params.customerId}
            </Text>
          </View>
        </View>
        <Divider />
        <Separator width="100%" color={pallets.grey3} />
        <Divider />
        <Text variant="bold-700">Overview</Text>
        <Divider space="s" />
        <ListItem
          label="Transaction amount"
          value={formatCurrency(Number(params.amount) / 100)}
        />
        {feeQuery.data && !airtime && (
          <>
            <ListItem
              label="Transaction fee"
              value={formatCurrency(feeQuery.data?.data || '0')}
            />
            <ListItem
              label="Total"
              value={formatCurrency(
                Number(feeQuery.data?.data) + Number(params.amount) / 100,
              )}
            />
          </>
        )}
        <Divider />
        <Separator width="100%" color={pallets.grey3} />
        <Divider />
        <Button
          label="Confirm"
          isLoading={feeQuery.isLoading}
          onPress={() => {
            navigation.navigate('BillPin', {
              account: params.account,
              amount: params.amount,
              customerEmail: params?.customerEmail,
              customerId: params?.customerId,
              customerMobile: params?.customerMobile,
              fullName: params.fullName,
              label: params.label,
              paymentCode: params?.paymentCode,
              type: params.type,
            });
          }}
        />
      </Container>
      <View />
    </>
  );
}

const styles = StyleSheet.create({
  accountAbbr: {
    alignItems: 'center',
    backgroundColor: pallets.secondary,
    borderRadius: spacing.xxl,
    height: spacing.xxl,
    justifyContent: 'center',
    marginRight: spacing.s,
    width: spacing.xxl,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
