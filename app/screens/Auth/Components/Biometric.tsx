import { TouchableOpacity, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import type { LoginModel } from 'authModels';

import { Icon } from 'assets';
import { pallets } from 'constant';
import { setBiometric, useDispatch, useSelector } from 'store';
import { useBiometricType } from 'hooks';

interface Props {
  login: ({ password, email }: LoginModel) => void;
}

export default function Biometric({ login }: Props): JSX.Element | null {
  const { biometrics } = useSelector(state => state.persisted);
  const { biometricType } = useBiometricType();
  const dispatch = useDispatch();

  if (!biometricType) {
    return null;
  }

  if (!biometrics) {
    return null;
  }

  async function getCredentials() {
    try {
      const credentials = await Keychain.getGenericPassword({
        authenticationPrompt: {
          cancel: 'Dismiss',
          title: 'Authentication Needed',
        },
        service: 'biometric',
      });
      if (credentials) {
        console.log('Successfully ' + credentials.password + ' ' + credentials.username);

        login({
          email: credentials.username,
          password: credentials.password,
        });
      } else {
        console.log('No credentials stored'); //TODO: Dispatch a message to the user to login manually
        dispatch(setBiometric(false));
      }
    } catch (error) {
      console.log('Something went wrong!', error);
    }
  }

  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <TouchableOpacity onPress={getCredentials} activeOpacity={0.6}>
        <Icon color={pallets.primary} name="biometric-ios-facescan" size={60} />
      </TouchableOpacity>
    </View>
  );
}
