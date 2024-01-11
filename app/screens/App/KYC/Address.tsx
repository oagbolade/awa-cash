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
import { KYCRoutes, StackNavigationProps } from 'navigation';
import { useService, useUpgradeAccountMutation } from 'service';
import { addressValidationSchema } from 'utils';

export default function Address({
  navigation,
}: StackNavigationProps<KYCRoutes, 'Address'>): JSX.Element {
  const [upgradeAccount, { isError, isLoading, isSuccess, error }] =
    useUpgradeAccountMutation();

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      navigation.navigate('KYCSuccess', { message: 'Address uploaded successfully' });
    },
  });

  return (
    <>
      <Header />
      <VirtualScroll>
        <Container>
          <Title
            title="Address"
            subtitle="Please enter your address and upload utility bill."
          />
          <Form
            validationSchema={addressValidationSchema}
            initialValues={{
              address: '',
              city: '',
              state: '',
            }}
            onSubmit={values => {
              console.log('🚀 ~ file: Address.tsx:19 ~ Address ~ values:', values);
              upgradeAccount({
                address: values.address,
                city: values.city,
                country: 'Nigeria',
                state: values.state,
              });
            }}>
            <FormField
              name="address"
              label="Address"
              placeholder="123, Pedro St. Lekki, Lagos"
            />
            <FormField name="state" label="State" />
            <FormField name="city" label="City" />
            <Divider />
            <Submit label="Continue" isLoading={isLoading} />
          </Form>
        </Container>
      </VirtualScroll>
    </>
  );
}
