import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { OnboardRoutes } from '../types';

import { Onboard } from 'screens/Onboard';

const { Group, Navigator, Screen } = createStackNavigator<OnboardRoutes>();

export default function AuthNavigator(): JSX.Element {
  return (
    <Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerBackTitleVisible: false,
        headerShown: false,
        headerTitle: '',
      }}>
      <Group screenOptions={{ headerShown: false }}>
        <Screen name="Onboard" component={Onboard} />
      </Group>
    </Navigator>
  );
}
