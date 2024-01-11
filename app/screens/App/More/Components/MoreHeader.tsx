//TBD
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from 'components';
import { useHeaderHeight } from 'hooks';
import { layout, pallets } from 'constant';
import { Icon } from 'assets';

const { padding } = layout.spacing;

export default function MoreHeader(): JSX.Element | null {
  const { insets, headerHeight } = useHeaderHeight();

  return (
    <>
      <View style={{ backgroundColor: pallets.primary, height: insets.top }} />
      <View
        style={[
          styles.header,
          {
            backgroundColor: pallets.primary,
            height: headerHeight - insets.top,
            paddingHorizontal: padding / 2,
          },
        ]}>
        <View />
        <View style={styles.label}>
          <Text color={pallets.white} variant="bold-700" textTransform="capitalize">
            More
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('notif');
          }}>
          <Icon size={20} color={pallets.white} name="notification" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -1,
  },
});
