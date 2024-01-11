import {
  Button,
  Container,
  Divider,
  Footer,
  Form,
  FormPin,
  Header,
  Submit,
  Title,
  VirtualScroll,
} from 'components';
import { AuthRoutes, StackNavigationProps } from 'navigation';
import {
  useSendPasswordVerificationMutation,
  useService,
  useVerifyForgotPasswordMutation,
} from 'service';
import { verifyEmailValidationSchema as validationSchema } from 'utils';

export default function ValidateResetOTP({
  navigation,
  route,
}: StackNavigationProps<AuthRoutes, 'ValidateResetOTP'>): JSX.Element {
  const [sendCode, sendQuery] = useSendPasswordVerificationMutation();
  const { params } = route;
  const [verify, { isError, isLoading, isSuccess, error, reset, data }] =
    useVerifyForgotPasswordMutation();

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      navigation.navigate('ResetPassword', {
        email: params.email,
        hash: data?.data || '',
      });
    },
  });

  useService({
    error: sendQuery.error,
    isError: sendQuery.isError,
    isLoading: sendQuery.isLoading,
    isSuccess: sendQuery.isSuccess,
  });

  return (
    <>
      <Header />
      <VirtualScroll>
        <Container>
          <Title title="Verify Email" />
          <Form
            {...{ validationSchema }}
            initialValues={{
              code: '',
            }}
            onSubmit={({ code }) => {
              reset();
              sendQuery.reset();
              verify({
                code,
                hash: sendQuery.data?.data || params.hash,
              });
            }}>
            <FormPin name="code" cellCount={6} />
            <Divider />
            <Footer>
              <Submit label="Verify" {...{ isLoading }} />
              <Divider space="s" />
              {!isLoading && (
                <Button
                  isLoading={sendQuery.isLoading}
                  label="Resend OTP"
                  variant="secondary"
                  onPress={() => {
                    reset();
                    sendQuery.reset();
                    sendCode({ email: params.email });
                  }}
                />
              )}
              <Divider />
            </Footer>
          </Form>
        </Container>
      </VirtualScroll>
    </>
  );
}
