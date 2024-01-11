import { TextInput, View } from 'react-native';
import { useRef, useState } from 'react';

import { Biometric } from '../Components';

import {
  ActionText,
  Container,
  Divider,
  Form,
  FormCheck,
  FormField,
  Header,
  Submit,
  Text,
  Title,
  VirtualScroll,
} from 'components';
import { setEmail, setRememberMe, useDispatch, useSelector } from 'store';
import { layout } from 'constant';
import { AuthRoutes, StackNavigationProps } from 'navigation';
import { loginValidationSchema, storeBiometricsCredentials } from 'utils';
import { useLoginMutation, useService } from 'service';

const { fonts } = layout;

export default function Login({
  navigation,
}: StackNavigationProps<AuthRoutes, 'Login'>): JSX.Element {
  const { email, rememberMe } = useSelector(state => state.persisted);
  const [showPass, setShowPass] = useState(true);
  const [login, { isLoading, isError, isSuccess, error }] = useLoginMutation();

  const passwordRef = useRef<TextInput>(null);
  const dispatch = useDispatch();

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
  });

  return (
    <>
      <Header />
      <VirtualScroll>
        <Container>
          <Title title="Login" />
          <Form
            validationSchema={loginValidationSchema}
            initialValues={{
              email: email,
              password: '',
              remember: rememberMe,
            }}
            onSubmit={({ email: mail, password, remember }) => {
              dispatch(setEmail(mail));
              dispatch(setRememberMe(remember));

              login({ email: mail, password });
              storeBiometricsCredentials({
                email: mail,
                password,
              });
            }}>
            <FormField
              name="email"
              label="Email"
              symbol="@"
              icon="message"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <FormField
              ref={passwordRef}
              name="password"
              label="Password"
              icon="lock"
              secureTextEntry={showPass}
              rightIcon={showPass ? 'eye' : 'eye-slash'}
              onRightIconPress={() => setShowPass(i => !i)}
            />
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <FormCheck name="remember" label="Keep me signed in" />
              <Text
                textTransform="capitalize"
                size={fonts.subhead}
                variant="bold-700"
                onPress={() => {
                  navigation.navigate('RequestResetOTP');
                }}>
                Forgot Password?
              </Text>
            </View>
            <Divider space="xxl" />
            <Submit label="Login" {...{ isLoading }} />
            <Divider />
            <ActionText
              action="Sign Up"
              question="Don't have an account?"
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            />
            <Divider />
          </Form>
          <Biometric login={login} />
        </Container>
      </VirtualScroll>
    </>
  );
}
