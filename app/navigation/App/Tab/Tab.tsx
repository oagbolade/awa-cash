import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

import { TabRoutes } from '../../types';

import { Home, Loans, More, Savings } from 'screens/App';
import { Text } from 'components';
import { Icon } from 'assets';
import { getTabIcon } from 'utils';

const { Screen, Navigator } = createBottomTabNavigator<TabRoutes>();

export default function Tab(): JSX.Element {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const name = getTabIcon(route);

          return <Icon {...{ color, name, size }} />;
        },
        tabBarLabel: ({ color, focused }) => {
          return (
            <Text
              variant={focused ? 'bold-700' : 'medium-500'}
              size={12}
              color={color}
              style={[Platform.OS === 'android' ? { padding: 10 } : {}]}>
              {route.name}
            </Text>
          );
        },
        tabBarStyle: [Platform.OS === 'android' && { height: 60, padding: 10 }],
      })}>
      <Screen name="Home" component={Home} />
      <Screen name="Savings" component={Savings} />
      <Screen name="Loans" component={Loans} />
      <Screen name="More" component={More} />
    </Navigator>
  );
}
