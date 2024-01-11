import { StyleSheet, View } from 'react-native';
import Lottie from 'lottie-react-native';

import { Button, Container, Divider, Text } from 'components';
import { lottie } from 'assets';
import { AppRoutes, RootNavigationProp, TransferRoutes } from 'navigation';

export default function TransferSuccess({
  navigation,
  route,
}: RootNavigationProp<AppRoutes, TransferRoutes, 'TransferSuccess'>): JSX.Element {
  const { params } = route;
  console.log('🚀 ~ file: TransferSuccess.tsx:13 ~ params:', params);

  return (
    <Container topInset>
      <View style={styles.container}>
        <Lottie
          source={lottie['success-anim']}
          autoPlay
          loop
          style={{
            height: 200,
            width: 200,
          }}
        />
        <Divider />
        <Text variant="bold-700" size={24}>
          Transfer successful
        </Text>
        <View style={{ width: '100%' }}>
          <Button
            label="Done"
            onPress={() => {
              navigation.navigate('TabStack', { screen: 'Home' });
            }}
          />
          <Divider space="m" />
          <Button
            variant="outline"
            label="View Receipt"
            onPress={() => {
              navigation.navigate('TransferReceipt', { ...params });
            }}
          />
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 3,
    justifyContent: 'space-evenly',
  },
});
