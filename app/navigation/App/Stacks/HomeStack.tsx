import { createStackNavigator } from '@react-navigation/stack';

import { HomeRoutes } from '../../types';

import TransferStack from './TransferStack';
import BillStack from './BillStack';

import { Notifications, Transactions } from 'screens';

const { Navigator, Screen, Group } = createStackNavigator<HomeRoutes>();

export default function HomeNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Group>
        <Screen name="Transfer" component={TransferStack} />
        <Screen name="Bill" component={BillStack} />
        <Screen name="Transactions" component={Transactions} />
        <Screen name="Notifications" component={Notifications} />
      </Group>
    </Navigator>
  );
}
