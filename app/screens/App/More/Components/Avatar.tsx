import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Icon } from 'assets';
import { layout, pallets } from 'constant';
import { Divider, Text } from 'components';
import { useSelector } from 'store';

const { fonts, misc } = layout;

interface Props {
  level?: string;
}

export default function Avatar({ level }: Props): JSX.Element | null {
  const { user } = useSelector(state => state.auth);

  return (
    <View style={styles.header}>
      <Divider space="m" />
      <TouchableOpacity disabled>
        <View style={styles.imgContainer}>
          <Icon name="user" color={pallets.text} size={40} />
          {Boolean(user?.profileImageUrl) && (
            <Image source={{ uri: user?.profileImageUrl }} style={styles.image} />
          )}
          {/* <View style={styles.edit}>
            <Icon name="edit-2" size={16} color={pallets.white} />
          </View> */}
        </View>
      </TouchableOpacity>
      <Divider space="t" />
      <Text
        variant="bold-700"
        textTransform="capitalize"
        color={pallets.black}
        size={fonts.subhead}>
        {user?.fullName || user?.firstName}
      </Text>
      <Divider space="t" />
      <Text size={fonts.caption2} color={pallets.grey2}>
        Status: Level {level}
      </Text>
    </View>
  );
}

// const ICON_BOX = 20;
// const EDIT_ICON_BOX = 10;

const styles = StyleSheet.create({
  // edit: {
  //   alignItems: 'center',
  //   backgroundColor: pallets.primary,
  //   borderRadius: ICON_BOX / 2,
  //   bottom: EDIT_ICON_BOX,
  //   height: ICON_BOX,
  //   justifyContent: 'center',
  //   padding: EDIT_ICON_BOX,
  //   position: 'absolute',
  //   right: 0,
  //   width: ICON_BOX,
  //   zIndex: EDIT_ICON_BOX,
  // },
  header: {
    alignItems: 'center',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: misc.avatarLarge / 2,
    height: undefined,
    width: undefined,
  },
  imgContainer: {
    alignItems: 'center',
    borderColor: pallets.primary,
    borderRadius: misc.avatarLarge,
    borderWidth: 0.2,
    height: misc.avatarLarge,
    justifyContent: 'center',
    width: misc.avatarLarge,
  },
});
