import {
  AltHeader,
  Container,
  Divider,
  Form,
  FormField,
  FormMaskField,
  FormPicker,
  Submit,
  TagTitle,
  VirtualScroll,
} from 'components';
import { pallets } from 'constant';
import { StackNavigationProps, TransferRoutes } from 'navigation';
import { useLocalNameEnquiryMutation, useService } from 'service';
import { useSelector } from 'store';
import { myAccountValidationSchema } from 'utils';

export default function MyAccountTransfer({
  navigation,
  route,
}: StackNavigationProps<TransferRoutes, 'MyAccountTransfer'>): JSX.Element {
  const { params } = route;
  const [enquiry, { isError, isLoading, isSuccess, data, error }] =
    useLocalNameEnquiryMutation();
  const { accounts } = useSelector(state => state.auth);

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
  });

  return (
    <>
      <AltHeader color={pallets.primary} label="Awacash Transfer" />
      <VirtualScroll>
        <Container backgroundColor="transparent">
          <TagTitle title="Enter Details" marginBottom={40} />
          <Form
            validationSchema={myAccountValidationSchema}
            initialValues={{
              account: undefined as unknown as PickerItemProps,
              amount: '',
              details: '',
            }}
            onSubmit={val => {
              if (data?.data) {
                navigation.navigate('MyAccountConfirm', {
                  account: params.account,
                  accountName: data.data.name,
                  accountNumber: val.account.value,
                  amount: val.amount,
                  bankName: 'Awacash',
                  details: val.details,
                });
              }
            }}>
            <FormPicker
              name="account"
              label="Transfer To"
              placeholder="Select account"
              items={accounts
                .filter(i => Boolean(i.accountNumber))
                .filter(i => i.accountNumber !== params.account)
                .map(item => ({
                  label: `${
                    item.accountType.includes('Savings') ? 'Savings' : item.accountType
                  } Account: ${item.accountNumber}`,
                  value: item.accountNumber,
                }))}
              onSelect={item => {
                console.log(item);
                enquiry(item.value);
              }}
              note={{
                description: data?.data.name || '',
              }}
              isLoading={isLoading}
            />
            <FormMaskField name="amount" label="Amount" />
            <FormField name="details" label="Details" />
            <Divider />
            <Submit label="Next" />
          </Form>
        </Container>
      </VirtualScroll>
    </>
  );
}
