import { Alert } from 'react-native';

import {
  ActionText,
  Container,
  Divider,
  Form,
  FormPin,
  Header,
  Submit,
  Title,
  VirtualScroll,
} from 'components';
import { layout } from 'constant';
import { AuthRoutes, StackNavigationProps } from 'navigation';
import {
  useSendAccountVerificationMutation,
  useService,
  useVerifyAccountMutation,
} from 'service';
import { otpValidationSchema } from 'utils';

const { spacing } = layout;

export default function AwacashValidateAccountOTP({
  navigation,
  route,
}: StackNavigationProps<AuthRoutes, 'AwacashValidateAccountOTP'>): JSX.Element {
  const { params } = route;
  const [verifyAccount, { isSuccess, isError, error, isLoading, data, reset }] =
    useVerifyAccountMutation();
  const [resendToken, resendQuery] = useSendAccountVerificationMutation();

  useService({
    error,
    errorEffect() {
      reset();
    },
    errorTitle: 'Registration Error',
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      reset();
      navigation.navigate('AwacashSignUp', {
        accountId: params.accountId,
        firstName: params.firstName,
        hash: data?.data || '',
        lastName: params.lastName,
      });
    },
  });

  useService({
    error: resendQuery.error,
    isError: resendQuery.isError,
    isLoading: resendQuery.isLoading,
    isSuccess: resendQuery.isSuccess,
    successEffect() {
      Alert.alert('', 'OTP sent');
    },
  });

  return (
    <>
      <Header />
      <VirtualScroll>
        <Container>
          <Title
            title={`Validate Account ${'\n'}Number`}
            subtitle="Enter the OTP sent sent to your phone number"
          />
          <Form
            validationSchema={otpValidationSchema}
            initialValues={{ otp: '' }}
            onSubmit={({ otp }) => {
              resendQuery.reset();
              verifyAccount({
                code: otp,
                hash: resendQuery.data?.data.hash || params.hash,
              });
            }}>
            <FormPin name="otp" cellCount={6} />
            <Divider />
            <Submit
              label="Continue"
              marginBottom={spacing.m}
              {...{ isLoading }}
              disabled={resendQuery.isLoading}
            />
            <Divider space="s" />
            <ActionText
              action="Resend Code"
              question="I didn't receive code?"
              onPress={() => {
                resendToken({
                  accountNumber: params.accountNumber,
                });
              }}
            />
          </Form>
        </Container>
      </VirtualScroll>
    </>
  );
}
