import { StyleSheet, TextInput, View } from 'react-native';
import { useRef, useState } from 'react';

import {
  Container,
  Divider,
  Form,
  FormField,
  Header,
  Submit,
  Title,
  VirtualScroll,
} from 'components';
import { Logo } from 'assets';
import { AuthRoutes, StackNavigationProps } from 'navigation';
import { signUpValidationSchema } from 'utils';
import { useSendPhoneVerificationMutation, useService } from 'service';

export default function AwacashSignUp({
  navigation,
  route,
}: StackNavigationProps<AuthRoutes, 'AwacashSignUp'>): JSX.Element {
  const { params } = route;
  const [send, { isLoading, error, isError, isSuccess, data }] =
    useSendPhoneVerificationMutation();

  const [showPass, setShowPass] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);

  const [values, setValues] = useState({
    confirmPassword: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const phoneNumberRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      if (data?.data) {
        navigation.navigate('AwacashValidateNumberOTP', {
          ...values,
          accountHash: params.hash,
          accountId: params.accountId,
          firstName: params.firstName,
          hash: data.data,
          lastName: params.lastName,
        });
      }
    },
  });

  return (
    <>
      <Header />
      <Container>
        <VirtualScroll>
          <Logo name="logo" size="40%" style={{ alignSelf: 'center' }} />
          <Divider />
          <Title title="Personal Details" />
          <Form
            validationSchema={signUpValidationSchema}
            initialValues={{
              confirmPassword: '',
              email: '',
              password: '',
              phoneNumber: '',
            }}
            onSubmit={val => {
              setValues(val);
              send({ phoneNumber: val.phoneNumber });
            }}>
            <FormField
              label="Email"
              name="email"
              keyboardType="email-address"
              autoCorrect={false}
              returnKeyLabel="Next"
              returnKeyType="next"
              onSubmitEditing={() => phoneNumberRef.current?.focus()}
            />
            <FormField
              ref={phoneNumberRef}
              label="Phone Number"
              keyboardType="number-pad"
              name="phoneNumber"
              returnKeyLabel="Next"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <FormField
              ref={passwordRef}
              label="Password"
              name="password"
              secureTextEntry={showPass}
              returnKeyLabel="Next"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              rightIcon={showPass ? 'eye' : 'eye-slash'}
              onRightIconPress={() => setShowPass(i => !i)}
            />
            <FormField
              ref={confirmPasswordRef}
              label="Confirm Password"
              name="confirmPassword"
              secureTextEntry={showConfirm}
              returnKeyLabel="Done"
              returnKeyType="done"
              rightIcon={showConfirm ? 'eye' : 'eye-slash'}
              onRightIconPress={() => setShowConfirm(i => !i)}
            />
            <Divider space="xl" />
            <Submit {...{ isLoading }} label="Next" />
            <Divider space="s" />
          </Form>
          <View style={styles.container}>
            <View />
          </View>
        </VirtualScroll>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
