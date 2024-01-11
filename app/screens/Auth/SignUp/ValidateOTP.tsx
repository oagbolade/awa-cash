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
import { useService, useVerifyPhoneMutation } from 'service';
import { layout } from 'constant';
import { otpValidationSchema } from 'utils';

const { spacing } = layout;

export default function ValidateOTP({
  navigation,
  route,
}: StackNavigationProps<AuthRoutes, 'ValidateOTP'>): JSX.Element {
  const { params } = route;
  console.log('🚀 ~ file: ValidateOTP.tsx:14 ~ params:', params);
  const [verify, { isLoading, isError, error, isSuccess, data }] =
    useVerifyPhoneMutation();

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      if (data?.data) {
        navigation.navigate('PersonalDetails', { ...params, hash: data?.data });
      }
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
              console.log(value);
              verify({
                code: value.otp,
                hash: params?.hash,
                phoneNumber: params?.phoneNumber,
              });
            }}>
            <FormPin name="otp" cellCount={6} />
            <Divider />
            <Submit {...{ isLoading }} label="Continue" marginBottom={spacing.m} />
            <ActionText action="Resend Code" question="I didn't receive code?" />
          </Form>
        </Container>
      </VirtualScroll>
    </>
  );
}
