import { createStackNavigator } from '@react-navigation/stack';

import { AppRoutes } from '../types';

import Tab from './Tab';
import { HomeStack, KYCStack, MoreStack } from './Stacks';

const { Navigator, Screen, Group } = createStackNavigator<AppRoutes>();

export default function AppNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Group>
        <Screen name="TabStack" component={Tab} />
        <Screen name="HomeStack" component={HomeStack} />
        <Screen name="MoreStack" component={MoreStack} />
        <Screen name="KYCStack" component={KYCStack} />
      </Group>
    </Navigator>
  );
}
