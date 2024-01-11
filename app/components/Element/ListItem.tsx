import { StyleSheet, View } from 'react-native';

import { Text } from '../General';

import { layout } from 'constant';
import { useTheme } from 'hooks';

interface ListItemProps {
  label: string;
  value: string;
  color?: string;
  copy?: boolean;
  marginBottom?: number;
}

const { spacing, fonts } = layout;

export default function ListItem({
  label,
  value,
  color: pallet,
  marginBottom = spacing.m,
}: ListItemProps): JSX.Element | null {
  const { color: colr } = useTheme();
  const color = pallet || colr.text;

  return (
    <View style={[styles.row, { marginBottom }]}>
      <Text size={fonts.footnote} color={`${color}55`}>
        {label}
      </Text>
      <Text size={fonts.callout} variant="bold-700" color={color}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
