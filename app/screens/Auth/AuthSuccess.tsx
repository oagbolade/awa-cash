import { StyleSheet, View } from 'react-native';
import Lottie from 'lottie-react-native';

import { Button, Container, Divider, Text } from 'components';
import { lottie } from 'assets';
import { setAuthenticated, useDispatch } from 'store';
import { AuthRoutes, StackNavigationProps } from 'navigation';

export default function AuthSuccess({
  navigation,
  route,
}: StackNavigationProps<AuthRoutes, 'AuthSuccess'>): JSX.Element {
  const { type } = route.params;
  const dispatch = useDispatch();

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
          {type === 'signup' ? 'Account Created' : 'Password Reset Successful'}
        </Text>
        <Button
          label="Done"
          onPress={() => {
            if (type === 'reset') {
              navigation.navigate('Login');
            }
            if (type === 'signup') {
              // navigation.navigate('Login');
              dispatch(setAuthenticated(true));
            }
          }}
        />
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
