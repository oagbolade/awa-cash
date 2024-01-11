import { useState } from 'react';

import {
  Container,
  Form,
  FormField,
  Header,
  Submit,
  Title,
  VirtualScroll,
} from 'components';
import { AuthRoutes, StackNavigationProps } from 'navigation';
import { useSendAccountVerificationMutation, useService } from 'service';
import { accountNumberValidationSchema } from 'utils';

export default function AwacashAccountNo({
  navigation,
}: StackNavigationProps<AuthRoutes, 'AwacashAccountNo'>): JSX.Element {
  const [accountNum, setAccountNum] = useState('');
  const [sendToken, { isSuccess, isError, error, isLoading, data }] =
    useSendAccountVerificationMutation();

  useService({
    error,
    errorTitle: 'Registration Error',
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      navigation.navigate('AwacashValidateAccountOTP', {
        accountId: data?.data.accountId || '',
        accountNumber: accountNum,
        firstName: data?.data.firstName || '',
        hash: data?.data.hash || '',
        lastName: data?.data.lastName || '',
      });
    },
  });

  return (
    <>
      <Header />
      <VirtualScroll>
        <Container>
          <Title
            title="Account Number"
            subtitle="Please enter your Awacash account number"
          />
          <Form
            validationSchema={accountNumberValidationSchema}
            initialValues={{ accountNumber: '' }}
            onSubmit={({ accountNumber }) => {
              setAccountNum(accountNumber);
              sendToken({ accountNumber });
            }}>
            <FormField
              name="accountNumber"
              label="Account Number"
              placeholder="Enter Account Number"
              maxLength={10}
              keyboardType="number-pad"
              returnKeyLabel="Next"
              returnKeyType="next"
            />
            <Submit label="Continue" {...{ isLoading }} />
          </Form>
        </Container>
      </VirtualScroll>
    </>
  );
}
