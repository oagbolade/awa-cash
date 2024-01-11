import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { AuthRoutes } from '../types';

import {
  AuthSuccess,
  AwacashAccountNo,
  AwacashConfirmPin,
  AwacashCreatePin,
  AwacashPersonalDetails,
  AwacashSignUp,
  AwacashValidateAccountOTP,
  AwacashValidateNumberOTP,
  ConfirmPin,
  CreatePin,
  Login,
  PersonalDetails,
  RequestResetOTP,
  ResetPassword,
  SignUp,
  ValidateOTP,
  ValidateResetOTP,
  Welcome,
} from 'screens/Auth';

const { Group, Navigator, Screen } = createStackNavigator<AuthRoutes>();

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
        <Screen name="Welcome" component={Welcome} />
      </Group>
      <Group>
        <Screen name="Login" component={Login} />
        <Screen name="RequestResetOTP" component={RequestResetOTP} />
        <Screen name="ResetPassword" component={ResetPassword} />
        <Screen name="ValidateResetOTP" component={ValidateResetOTP} />
      </Group>
      <Group>
        <Screen name="SignUp" component={SignUp} />
        <Screen name="PersonalDetails" component={PersonalDetails} />
        <Screen name="ValidateOTP" component={ValidateOTP} />
        <Screen name="CreatePin" component={CreatePin} />
        <Screen name="ConfirmPin" component={ConfirmPin} />
      </Group>
      <Group>
        <Screen name="AwacashAccountNo" component={AwacashAccountNo} />
        <Screen name="AwacashSignUp" component={AwacashSignUp} />
        <Screen name="AwacashConfirmPin" component={AwacashConfirmPin} />
        <Screen name="AwacashCreatePin" component={AwacashCreatePin} />
        <Screen name="AwacashPersonalDetails" component={AwacashPersonalDetails} />
        <Screen name="AwacashValidateAccountOTP" component={AwacashValidateAccountOTP} />
        <Screen name="AwacashValidateNumberOTP" component={AwacashValidateNumberOTP} />
      </Group>
      <Group
        screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}>
        <Screen name="AuthSuccess" component={AuthSuccess} />
      </Group>
    </Navigator>
  );
}
