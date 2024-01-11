import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { layout, pallets } from 'constant';
import { Icon } from 'assets';
import { Text } from 'components';
import { useTheme } from 'hooks';

interface ProcessCardProp {
  iconColor?: string;
  label?: string;
  icon: IconName;
  onPress?: () => void;
  size?: number;
  marginBottom?: number;
  active: boolean;
}

export default function ProcessCard({
  label,
  icon,
  onPress,
  active,
  iconColor,
  marginBottom = 16,
}: ProcessCardProp): JSX.Element {
  const { color } = useTheme();

  return (
    <>
      <TouchableOpacity
        disabled={active}
        {...{ onPress }}
        activeOpacity={0.65}
        style={[
          styles.container,
          styles.row,
          { backgroundColor: color.altBG, marginBottom },
        ]}>
        <View style={[styles.row, { flex: 0.75 }]}>
          <Icon name={icon} color={iconColor} size={20} />
          <View style={{ marginLeft: 16 }}>
            <Text variant="reg-400" size={layout.fonts.subhead}>
              {label}
            </Text>
          </View>
        </View>
        <View style={{ flex: 0.3 }}>
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: active ? pallets.secondary : pallets.deactivate,
              borderRadius: 8,
              padding: 8,
              width: 70,
            }}>
            <Text
              color={pallets.white}
              variant="reg-400"
              size={layout.fonts.caption2}
              style={{ alignSelf: 'center' }}>
              {active ? 'Done' : 'Not Done'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 16,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
