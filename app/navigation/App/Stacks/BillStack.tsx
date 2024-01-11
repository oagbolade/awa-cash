import { createStackNavigator } from '@react-navigation/stack';

import { BillRoutes } from '../../types';

import {
  AirtimeOrData,
  BillPin,
  BillReceipt,
  BillSelectAccount,
  BillSuccess,
  Biller,
  BillerCategory,
  BillerConfirmation,
  BillerDetails,
} from 'screens/App/Home/Bills';

const { Navigator, Screen, Group } = createStackNavigator<BillRoutes>();

export default function BillNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Group>
        <Screen name="Biller" component={Biller} />
        <Screen name="BillerCategory" component={BillerCategory} />
        <Screen name="BillerDetails" component={BillerDetails} />
        <Screen name="BillSelectAccount" component={BillSelectAccount} />
        <Screen name="BillerConfirmation" component={BillerConfirmation} />
      </Group>
      <Group>
        <Screen name="AirtimeOrData" component={AirtimeOrData} />
      </Group>
      <Group>
        <Screen name="BillPin" component={BillPin} />
        <Screen name="BillSuccess" component={BillSuccess} />
        <Screen name="BillReceipt" component={BillReceipt} />
      </Group>
    </Navigator>
  );
}
