// import * as LocalAuthentication from 'expo-local-authentication';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    // alert("🔐 Here's your value 🔐 \n" + result);
    console.log(result);
  } else {
    // alert('No values stored under that key.');
    // console.log(result);
    throw new Error('No values stored');
  }
}

export const storeCredentials = async () => {
  try {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      'GitHub stars are neat 🌟',
    );

    if (digest) {
      save('biometrics', digest);
    }
  } catch {}
};

// export const getBiometricIcon = (type: LocalAuthentication): IconName => {
//   switch (type) {
//     case type:
//       return 'biometric-ios-facescan';
//     case Keychain.BIOMETRY_TYPE.TOUCH_ID:
//       return 'biometric-ios-touchID';
//     case Keychain.BIOMETRY_TYPE.FINGERPRINT:
//       return 'biometric-android-fingerprint';
//     case Keychain.BIOMETRY_TYPE.FACE:
//       return 'biometric-android-facescan';
//     default:
//       return 'biometric-android-fingerprint';
//   }
// };
