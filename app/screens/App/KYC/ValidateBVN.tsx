//TODO: TBD
import {
  ActionText,
  Container,
  Divider,
  Form,
  FormPin,
  Header,
  Submit,
  Title,
} from 'components';
import { layout } from 'constant';

const { spacing } = layout;

export default function ValidateBVN(): JSX.Element {
  return (
    <>
      <Header />
      <Container>
        <Title
          title="Validate BVN"
          subtitle="Enter the OTP sent sent to silv********@gmail.com"
        />
        <Form
          initialValues={{ otp: '' }}
          onSubmit={value => {
            console.log(value);
          }}>
          <FormPin name="otp" cellCount={6} />
          <Divider />
          <Submit label="Continue" marginBottom={spacing.m} />
          <ActionText action="Resend Code" question="I didn't receive code?" />
        </Form>
      </Container>
    </>
  );
}
