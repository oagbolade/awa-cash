import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import {
  AccountSetup,
  Address,
  KYCSuccess,
  TakeSelfie,
  UtilityBill,
  ValidID,
  VerifyBVN,
  VerifyBVNWeb,
} from 'screens/App/KYC';
import { KYCRoutes } from 'navigation/types';

const { Navigator, Screen, Group } = createStackNavigator<KYCRoutes>();

export default function KYCSack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Group>
        <Screen name="AccountSetup" component={AccountSetup} />
      </Group>
      <Group>
        <Screen name="VerifyBVN" component={VerifyBVN} />
        <Screen name="VerifyBVNWeb" component={VerifyBVNWeb} />
        <Screen name="TakeSelfie" component={TakeSelfie} />
        <Screen name="Address" component={Address} />
        <Screen name="UtilityBill" component={UtilityBill} />
        <Screen name="ValidID" component={ValidID} />
      </Group>
      <Group>
        <Screen
          name="KYCSuccess"
          component={KYCSuccess}
          options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
        />
      </Group>
    </Navigator>
  );
}
