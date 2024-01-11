import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useHeaderHeight } from 'hooks';
import { layout, pallets } from 'constant';
import { Divider, Text } from 'components';
import { Icon } from 'assets';
import { getTimeOfDay } from 'utils';
import { useSelector } from 'store';
import { AppRoutes, TabRoutes, useRootNavigationProp } from 'navigation';
const { fonts, spacing, misc } = layout;

interface Props {
  image?: string | null;
}

export default function HomeHeader({ image }: Props): JSX.Element | null {
  const { insets, headerHeight } = useHeaderHeight();
  const { user } = useSelector(state => state.auth);
  const navigation = useNavigation<useRootNavigationProp<AppRoutes, TabRoutes, 'Home'>>();

  return (
    <>
      <View style={{ height: insets.top }} />
      <View
        style={[
          styles.row,
          {
            height: headerHeight - insets.top,
            justifyContent: 'space-between',
            paddingHorizontal: spacing.padding / 2,
          },
        ]}>
        <View style={styles.row}>
          <TouchableOpacity>
            <View style={styles.imgContainer}>
              <Icon name="user" color={pallets.grey} size={20} />
              {image ? <Image source={{ uri: image }} style={styles.image} /> : <View />}
            </View>
          </TouchableOpacity>
          <Divider horizontal space="s" />
          <Text size={fonts.callout} textTransform="capitalize">
            Good {getTimeOfDay()} {user?.firstName}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HomeStack', { screen: 'Notifications' });
          }}>
          <Icon name="notification" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    height: undefined,
    width: undefined,
  },
  imgContainer: {
    alignItems: 'center',
    borderColor: pallets.grey,
    borderRadius: misc.avatar / 2,
    borderWidth: 0.5,
    height: misc.avatar,
    justifyContent: 'center',
    overflow: 'hidden',
    width: misc.avatar,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
