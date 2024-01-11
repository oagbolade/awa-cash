import * as Keychain from 'react-native-keychain';

interface LoginCredential {
  email: string;
  password: string;
}

export async function storeBiometricsCredentials({ password, email }: LoginCredential) {
  try {
    const result = await Keychain.setGenericPassword(email, password, {
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
      authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS,
      securityLevel: Keychain.SECURITY_LEVEL.ANY,
      service: 'biometric',
      storage: Keychain.STORAGE_TYPE.KC,
    });

    console.log(
      '🚀 ~ file: keychain.ts:17 ~ storeBiometricsCredentials ~ result:',
      result,
    );
  } catch (error) {
    console.log('🚀 ~ file: keychain.ts:23 ~ storeBiometricsCredentials ~ error:', error);
  }
}
