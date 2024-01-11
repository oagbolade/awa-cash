import { StyleSheet, View } from 'react-native';

import { Text } from '../General';

import Separator from './Separator';
import Divider from './Divider';

import { layout } from 'constant';

interface ReceiptListItemProps {
  label: string;
  value: string;
  value2?: string;
  value3?: string;
  marginBottom?: number;
  marginVertical?: number;
  hideTopSeparator?: boolean;
}

const { fonts } = layout;

export default function ReceiptListItem({
  label,
  value,
  value2,
  value3,
  //   marginBottom = spacing.m,
  hideTopSeparator,
}: ReceiptListItemProps): JSX.Element | null {
  return (
    <View style={{}}>
      <Divider />
      {!hideTopSeparator && <Separator width="100%" />}
      <Divider />
      <View style={[styles.row, {}]}>
        <View style={{ flex: 1 }}>
          <Text textTransform="uppercase" size={fonts.footnote}>
            {label}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end', flex: 1 }}>
          <Text textAlign="right" size={fonts.callout} variant="bold-700">
            {value}
          </Text>
          {Boolean(value2) && (
            <>
              <Divider space="t" />
              <Text size={fonts.callout}>{value2}</Text>
            </>
          )}
          {Boolean(value3) && (
            <>
              <Divider space="t" />
              <Text size={fonts.callout}>{value3}</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    // alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
