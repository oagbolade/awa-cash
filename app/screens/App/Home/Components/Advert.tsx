import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Lottie from 'lottie-react-native';

import { lottie } from 'assets';
import { layout, pallets } from 'constant';
import { Divider, Text } from 'components';

const { fonts, spacing } = layout;

export default function Advert(): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.7 }}>
        <Text variant="bold-700" color={pallets.white}>
          Cowry App
        </Text>
        <Divider space="t" />
        <Text color={pallets.white} size={fonts.callout}>
          Want some discount? Download the cowry app to get started.
        </Text>
        <Divider space="s" />
        <TouchableOpacity style={styles.btn}>
          <Text variant="bold-700" size={fonts.callout}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.3,
        }}>
        <Lottie
          source={lottie['tag-anim']}
          autoPlay
          loop={false}
          style={{
            bottom: 0,
            height: 100,
            // position: 'absolute',
            right: 0,
            width: 100,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'flex-start',
    backgroundColor: pallets.white,
    borderRadius: spacing.s,
    padding: spacing.s,
  },
  container: {
    backgroundColor: pallets.black,
    borderRadius: spacing.s,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: spacing.padding,
  },
});
