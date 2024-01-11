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
import { AuthRoutes, StackNavigationProps } from 'navigation';
import {
  useSendPhoneVerificationMutation,
  useService,
  useVerifyPhoneMutation,
} from 'service';
import { layout } from 'constant';
import { otpValidationSchema } from 'utils';

const { spacing } = layout;

export default function AwacashValidateNumberOTP({
  navigation,
  route,
}: StackNavigationProps<AuthRoutes, 'AwacashValidateNumberOTP'>): JSX.Element {
  const { params } = route;
  const [verify, { isLoading, isError, error, isSuccess, data, reset }] =
    useVerifyPhoneMutation();
  const [resend, resendQuery] = useSendPhoneVerificationMutation();

  useService({
    error,
    errorEffect() {
      reset();
    },
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      reset();
      if (data?.data) {
        // navigation.navigate('PersonalDetails', { ...params, hash: data?.data });
        navigation.navigate('AwacashPersonalDetails', {
          ...params,
          hash: params.accountHash,
        });
      }
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
            title="Validate OTP"
            subtitle={`Enter the OTP sent sent to ${params.phoneNumber}`}
          />
          <Form
            validationSchema={otpValidationSchema}
            initialValues={{ otp: '' }}
            onSubmit={value => {
              resendQuery.reset();
              verify({
                code: value.otp,
                hash: resendQuery.data?.data || params?.hash,
                phoneNumber: params?.phoneNumber,
              });
            }}>
            <FormPin name="otp" cellCount={6} />
            <Divider />
            <Submit
              {...{ isLoading }}
              disabled={resendQuery.isLoading}
              label="Continue"
              marginBottom={spacing.m}
            />
            <ActionText
              action="Resend Code"
              question="I didn't receive code?"
              onPress={() => {
                resend({
                  phoneNumber: params.phoneNumber,
                });
              }}
            />
          </Form>
        </Container>
      </VirtualScroll>
    </>
  );
}
