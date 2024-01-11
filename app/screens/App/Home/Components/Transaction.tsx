import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Icon } from 'assets';
import { Divider, Text } from 'components';
import { layout, pallets } from 'constant';
import { useTheme } from 'hooks';
import { formatCurrency } from 'utils';

const { spacing, fonts } = layout;

interface Props {
  type: 'debit' | 'credit';
  amount: string;
  date: Date;
  message: string;
}

export default function Transaction({
  amount,
  date,
  message,
  type,
}: Props): JSX.Element | null {
  const { color } = useTheme();

  return (
    <TouchableOpacity
      disabled
      style={[
        styles.row,
        styles.transactionCard,
        { backgroundColor: color.altBG, justifyContent: 'space-between' },
      ]}>
      <View style={[styles.row, { flex: 1 }]}>
        <Icon
          name={type === 'credit' ? 'arrow-down-circle' : 'arrow-up-circle'}
          color={type === 'credit' ? pallets.green : pallets.red}
        />
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text textTransform="capitalize">{type}</Text>
          <Divider space="t" />
          <Text color={color.darkGrey} size={fonts.callout} textTransform="capitalize">
            {message?.slice?.(0, 20)}
          </Text>
          <Text color={color.darkGrey} size={fonts.callout} textTransform="capitalize">
            {new Date().toLocaleDateString()}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text size={fonts.callout} variant="bold-700">
          {formatCurrency(amount)}
        </Text>
        <Divider space="t" />
        <Text size={fonts.callout}>{new Date(date).toLocaleTimeString()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  transactionCard: {
    borderRadius: 16,
    padding: spacing.padding,
  },
});
