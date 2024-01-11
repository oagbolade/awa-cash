import {
  Container,
  Divider,
  Form,
  FormDocPicker,
  Header,
  Submit,
  Title,
} from 'components';
import { KYCRoutes, StackNavigationProps } from 'navigation';
import { utilityBillValidationSchema } from 'utils';

export default function UtilityBill({
  navigation,
}: StackNavigationProps<KYCRoutes, 'UtilityBill'>): JSX.Element {
  return (
    <>
      <Header />
      <Container>
        <Title title="Utility Bill" subtitle="Upload a valid utility bill" />
        <Form
          validationSchema={utilityBillValidationSchema}
          initialValues={{ utility: '' }}
          onSubmit={({ utility }) => {
            navigation.navigate('ValidID', { utilityBill: utility });
          }}>
          <FormDocPicker name="utility" label="Upload utility bill" />
          <Divider />
          <Submit label="Next" />
        </Form>
      </Container>
    </>
  );
}
