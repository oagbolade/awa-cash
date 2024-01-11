import { StyleSheet, View } from 'react-native';
import Lottie from 'lottie-react-native';

import { Button, Container, Divider, Text } from 'components';
import { lottie } from 'assets';
import { AppRoutes, BillRoutes, RootNavigationProp } from 'navigation';

export default function BillSuccess({
  navigation,
  route,
}: RootNavigationProp<AppRoutes, BillRoutes, 'BillSuccess'>): JSX.Element {
  const { params } = route;

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
          Payment successful
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
              navigation.navigate('BillReceipt', { ...params });
            }}
          />
          {/* <Divider space="m" />
          <Button variant="secondary" label="Download Receipt" /> */}
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
