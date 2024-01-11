import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

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
import { AuthRoutes, StackNavigationProps } from 'navigation';
import { emailValidationSchema } from 'utils';
import { useSendPasswordVerificationMutation, useService } from 'service';

export default function RequestResetOTP({
  navigation,
}: StackNavigationProps<AuthRoutes, 'RequestResetOTP'>): JSX.Element {
  const [mail, setMail] = useState('');
  const [sendCode, { isError, isLoading, isSuccess, data, error, reset }] =
    useSendPasswordVerificationMutation();

  // const handleSendCode = async ({ email }: { email: string }) => {
  //   const result = await sendCode({ email });

  //   if ('error' in result) {
  //     console.warn(result.error);
  //   } else {
  //     navigation.navigate('ValidateResetOTP', { email: mail, hash: data?.data || '' });
  //   }
  // };

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      navigation.navigate('ValidateResetOTP', { email: mail, hash: data?.data || '' });
    },
  });

  return (
    <>
      <Header />
      <VirtualScroll>
        <Container>
          <Title
            title="Password Reset"
            subtitle="Please enter your registered email address."
          />
          <Form
            validationSchema={emailValidationSchema}
            initialValues={{ email: '' }}
            onSubmit={({ email }) => {
              reset();
              setMail(email);
              sendCode({ email });
            }}>
            <FormField name="email" label="Email" />
            <Divider space="xl" />
            <Submit label="Continue" {...{ isLoading }} />
          </Form>
          <View style={styles.container} />
        </Container>
      </VirtualScroll>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
