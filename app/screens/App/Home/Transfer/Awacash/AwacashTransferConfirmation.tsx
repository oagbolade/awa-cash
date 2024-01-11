import { StyleSheet, View } from 'react-native';

import {
  AltHeader,
  Button,
  Container,
  Divider,
  ListItem,
  Separator,
  Text,
  VirtualScroll,
} from 'components';
import { layout, pallets } from 'constant';
import { StackNavigationProps, TransferRoutes } from 'navigation';
import { abbreviateString, formatCurrency } from 'utils';
import { useGetTransferFeeQuery } from 'service';

const { spacing, fonts } = layout;

export default function AwacashTransferConfirmation({
  navigation,
  route,
}: StackNavigationProps<TransferRoutes, 'AwacashTransferConfirmation'>): JSX.Element {
  const { params } = route;
  const feeQuery = useGetTransferFeeQuery({
    amount: Number(params.amount),
    type: 1,
  });

  return (
    <>
      <AltHeader color={pallets.primary} label="Confirmation" />
      <VirtualScroll>
        <Container backgroundColor="transparent">
          <Divider />
          <Text color={pallets.grey2}>Transfer to:</Text>
          <Divider />
          <View style={styles.row}>
            <View style={styles.accountAbbr}>
              <Text textTransform="uppercase" variant="medium-500" color={pallets.white}>
                {abbreviateString(params.accountName)}
              </Text>
            </View>
            <View>
              <Text variant="medium-500">
                {params.accountName} ({params.bankName})
              </Text>
              <Divider space="t" />
              <Text size={fonts.caption1} color={pallets.grey2}>
                Account number {params.accountNumber}
              </Text>
            </View>
          </View>
          <Divider />
          <Separator width="100%" color={pallets.grey3} />
          <Divider />
          <View>
            <Text size={fonts.caption1} color={pallets.grey2}>
              Transfer Details
            </Text>
            <Divider space="t" />
            <Text variant="medium-500">{params.details}</Text>
          </View>
          <Divider />
          <Separator width="100%" color={pallets.grey3} />
          <Divider />
          <Text variant="bold-700">Overview</Text>
          <Divider space="s" />
          <ListItem label="Transaction amount" value={formatCurrency(params.amount)} />
          <ListItem
            label="Transaction fee"
            value={formatCurrency(feeQuery.data?.data || '0')}
          />
          <ListItem
            label="Total"
            value={formatCurrency(Number(params.amount) + (feeQuery.data?.data || 0))}
          />
          <Separator width="100%" color={pallets.grey3} />
          <Divider space="xxl2" />
          <Button
            variant="secondary"
            color={pallets.secondary}
            label="Confirm"
            onPress={() => {
              navigation.navigate('AwacashTransferPin', { ...params });
            }}
          />
        </Container>
      </VirtualScroll>
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
