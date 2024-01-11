import { Platform, StyleSheet, View } from 'react-native';

import { AltHeader, Container, SectionCard, Switch } from 'components';
import { setBiometric, useDispatch, useSelector } from 'store';

export default function BiometricSettings(): JSX.Element {
  const { biometrics } = useSelector(state => state.persisted);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <AltHeader label="Biometrics" />
      <Container>
        <SectionCard
          disabled
          item={{
            icon:
              Platform.OS === 'ios'
                ? 'biometric-ios-facescan'
                : 'biometric-android-fingerprint',
            title: Platform.OS === 'ios' ? 'Face ID' : 'Fingerprint',
          }}
          RightComponent={
            <Switch
              enabled={biometrics}
              onValueChange={() => dispatch(setBiometric(!biometrics))}
            />
          }
        />
      </Container>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
