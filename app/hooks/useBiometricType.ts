import { useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';

export default function useBiometricType() {
  const [biometricType, setBiometricType] = useState(false);

  useEffect(() => {
    async function getBiometricType() {
      const bioType = await Keychain.getSupportedBiometryType();

      if (bioType) {
        setBiometricType(true);
      } else {
        setBiometricType(false);
      }
    }

    getBiometricType();
  }, []);

  return { biometricType };
}
