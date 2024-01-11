import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../General';

import { useHeaderHeight } from 'hooks';
import { layout, pallets } from 'constant';
import { Icon } from 'assets';
import { AppRoutes, TabRoutes, useRootNavigationProp } from 'navigation';

interface Props {
  title?: string;
}

const { padding } = layout.spacing;

export default function TabHeader({ title }: Props): JSX.Element | null {
  const { insets, headerHeight } = useHeaderHeight();
  const navigation = useNavigation<useRootNavigationProp<AppRoutes, TabRoutes, 'Home'>>();

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
            {title}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            navigation.navigate('HomeStack', { screen: 'Notifications' });
          }}>
          <Icon size={20} color={pallets.primary} name="notification" />
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
  iconContainer: {
    alignItems: 'center',
    backgroundColor: pallets.white,
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    width: 24,
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
