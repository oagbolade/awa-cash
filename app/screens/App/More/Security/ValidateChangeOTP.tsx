import {
  Container,
  Divider,
  Form,
  FormPin,
  Header,
  Submit,
  Title,
  VirtualScroll,
} from 'components';
import { AppRoutes, MoreRoutes, RootNavigationProp } from 'navigation';
import { layout } from 'constant';
import { otpValidationSchema } from 'utils';

const { spacing } = layout;

export default function ValidateChangeOTP({
  navigation,
}: RootNavigationProp<AppRoutes, MoreRoutes, 'ValidateChangeOTP'>): JSX.Element {
  return (
    <>
      <Header />
      <VirtualScroll>
        <Container>
          <Title title="OTP" subtitle={'Enter the OTP sent sent your mail'} />
          <Form
            validationSchema={otpValidationSchema}
            initialValues={{ otp: '' }}
            onSubmit={value => {
              console.log(value);
              navigation.navigate('ChangePassword');
            }}>
            <FormPin name="otp" cellCount={6} />
            <Divider />
            <Submit label="Continue" marginBottom={spacing.m} />
          </Form>
        </Container>
      </VirtualScroll>
    </>
  );
}
