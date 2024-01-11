import { StyleSheet, View } from 'react-native';
import Lottie from 'lottie-react-native';

import { Button, Container, Text } from 'components';
import { lottie } from 'assets';
import { AppRoutes, MoreRoutes, RootNavigationProp } from 'navigation';
import { layout } from 'constant';

const { fonts } = layout;

export default function MoreSuccess({
  route,
  navigation,
}: RootNavigationProp<AppRoutes, MoreRoutes, 'MoreSuccess'>): JSX.Element {
  const { params } = route;

  return (
    <Container topInset>
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Lottie
            source={lottie['success-anim']}
            autoPlay
            loop
            style={{
              height: 200,
              width: 200,
            }}
          />
        </View>
        <View>
          <Text variant="bold-700" size={fonts.body}>
            {params.message}{' '}
          </Text>
        </View>
        <Button
          label="Done"
          onPress={() => {
            navigation.navigate('TabStack', { screen: 'More' });
          }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
  },
});
