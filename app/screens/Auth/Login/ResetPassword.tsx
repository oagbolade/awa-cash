import { useRef } from 'react';
import { TextInput } from 'react-native';

import {
  Container,
  Divider,
  Footer,
  Form,
  FormField,
  Header,
  Submit,
  Title,
  VirtualScroll,
} from 'components';
import { AuthRoutes, StackNavigationProps } from 'navigation';
import { resetPasswordValidationSchema as validationSchema } from 'utils';
import { useResetPasswordMutation, useService } from 'service';

export default function ResetPassword({
  navigation,
  route,
}: StackNavigationProps<AuthRoutes, 'ResetPassword'>): JSX.Element {
  const { params } = route;
  const [reset, { isError, isLoading, isSuccess, error }] = useResetPasswordMutation();
  const confirmPasswordRef = useRef<TextInput>(null);

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      navigation.navigate('AuthSuccess', { type: 'reset' });
    },
  });

  return (
    <>
      <Header />
      <VirtualScroll>
        <Container>
          <Title title="Password Reset" />
          <Form
            {...{ validationSchema }}
            initialValues={{
              confirmPassword: '',
              password: '',
            }}
            onSubmit={({ confirmPassword, password }) => {
              reset({
                confirmPassword,
                email: params.email,
                hash: params.hash,
                password,
              });
            }}>
            <FormField
              label="Password"
              name="password"
              secureTextEntry
              returnKeyLabel="Next"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />
            <FormField
              ref={confirmPasswordRef}
              label="Confirm Password"
              name="confirmPassword"
              secureTextEntry
              returnKeyLabel="Done"
              returnKeyType="done"
            />
            <Footer>
              <Divider />
              <Submit label="Next" {...{ isLoading }} />
              <Divider />
            </Footer>
          </Form>
        </Container>
      </VirtualScroll>
    </>
  );
}
