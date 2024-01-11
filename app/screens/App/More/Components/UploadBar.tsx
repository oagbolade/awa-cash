import { StyleSheet, View } from 'react-native';

import { layout, pallets } from 'constant';

const { spacing } = layout;

interface UploadBarProps {
  percent: number;
  barWidth: number;
  barHeight: number;
}

export default function UploadBar({
  percent,
  barWidth,
  barHeight,
}: UploadBarProps): JSX.Element {
  return (
    <View
      style={[
        styles.container,
        {
          height: barHeight,
          width: barWidth,
        },
      ]}>
      <View style={[styles.bar, { width: percent }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: pallets.green,
    height: '100%',
  },
  container: {
    backgroundColor: pallets.grey,
    borderRadius: spacing.xs,
    overflow: 'hidden',
  },
});
