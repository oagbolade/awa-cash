import { RefreshControl, ScrollView } from 'react-native';
import { useState } from 'react';

import {
  AltHeader,
  Container,
  Divider,
  Form,
  FormField,
  FormPicker,
  Submit,
} from 'components';
import { AppRoutes, BillRoutes, RootNavigationProp } from 'navigation';
import { useGetPaymentItemQuery, useService, useValidateCustomerMutation } from 'service';
import FormInput from 'components/Form/FormMaskInput';
import { useSelector } from 'store';
import { billValidationSchema } from 'utils';

interface BillType {
  amount?: string;
  paymentCode?: string;
  customerId?: string;
  phoneNumber?: string;
  email?: string;
}

export default function BillerDetails({
  navigation,
  route,
}: RootNavigationProp<AppRoutes, BillRoutes, 'BillerDetails'>): JSX.Element {
  const [selectedBill, setSelectedBill] = useState<BillType | null>(null);
  const { user } = useSelector(state => state.auth);
  const { bill, billerId, fields, type } = route.params;
  const { isFetching, isLoading, data, refetch } = useGetPaymentItemQuery({
    billerId,
  });
  const [validate, validateQuery] = useValidateCustomerMutation();
  const [amountError, setAmountError] = useState({
    error: false,
    errorMessage: '',
  });

  const handleSetBiller = (value?: Partial<BillType>) => {
    setSelectedBill(previousData => ({
      ...previousData,
      ...value,
    }));
  };

  useService({
    error: validateQuery.error,
    errorEffect() {
      validateQuery.reset();
    },
    isError: validateQuery.isError,
    isLoading: validateQuery.isLoading,
    isSuccess: validateQuery.isSuccess,
    reset() {
      validateQuery.reset();
    },
    successEffect() {
      const amountInKobo = Number(selectedBill?.amount || 0) * 100;

      navigation.navigate('BillSelectAccount', {
        amount: String(amountInKobo) || '0',
        customerEmail: selectedBill?.email || '',
        customerId: selectedBill?.customerId || '',
        customerMobile: selectedBill?.phoneNumber || '',
        fullName: validateQuery.data?.data.fullName || '',
        label: fields.fieldLabel,
        paymentCode: selectedBill?.paymentCode || '',
        type,
      });

      validateQuery.reset();
    },
  });

  const errorMessage = 'Amount is required';

  console.log(selectedBill);

  return (
    <>
      <AltHeader label={bill} />
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              refetch();
            }}
            refreshing={isLoading || isFetching}
          />
        }>
        <Container>
          <Form
            validationSchema={billValidationSchema}
            initialValues={{
              customerId: '',
              email: user?.email || '',
              phoneNumber: user?.phoneNumber || '',
              product: '',
            }}
            onSubmit={({ customerId, email, phoneNumber }) => {
              validateQuery.reset();

              if (selectedBill?.amount === '0' || selectedBill?.amount === '') {
                setAmountError({
                  error: true,
                  errorMessage,
                });
              } else {
                handleSetBiller({ customerId, email, phoneNumber });
                setAmountError({
                  error: false,
                  errorMessage: '',
                });
                validate({
                  customerId,
                  paymentCode: selectedBill?.paymentCode || '',
                });
              }
            }}>
            <FormPicker
              isLoading={isLoading}
              items={
                data?.data.map(i => ({
                  label: i.paymentitemname,
                  value: i.amount,
                  value2: i.paymentCode,
                })) || []
              }
              label="Select Product"
              onSelect={item => {
                const amount =
                  item.value === '0' ? '' : String(Number(item.value || 0) / 100);

                handleSetBiller({ amount, paymentCode: item.value2 });
              }}
              name="product"
            />
            <FormField
              label={fields.fieldLabel}
              name="customerId"
              placeholder={fields.fieldLabel}
            />
            {Boolean(selectedBill) && (
              <>
                <FormInput
                  onBlur={() => {
                    if (selectedBill?.amount === '0' || selectedBill?.amount === '') {
                      setAmountError({
                        error: true,
                        errorMessage,
                      });
                    } else {
                      setAmountError({
                        error: false,
                        errorMessage: '',
                      });
                    }
                  }}
                  error={amountError.error}
                  errorMessage={amountError.errorMessage}
                  onChangeText={(_, text) => {
                    handleSetBiller({ amount: text });
                  }}
                  value={selectedBill?.amount || ''}
                  label="Amount"
                  keyboardType="number-pad"
                  returnKeyLabel="Next"
                  returnKeyType="next"
                />
                <FormField
                  editable={!(type === 3)}
                  label="Mobile Number"
                  keyboardType="number-pad"
                  name="phoneNumber"
                  returnKeyLabel="Next"
                  returnKeyType="next"
                />
                <FormField
                  editable={!(type === 3)}
                  label="Email"
                  name="email"
                  keyboardType="email-address"
                  autoCorrect={false}
                  returnKeyLabel="Next"
                  returnKeyType="next"
                />
              </>
            )}
            <Divider />
            <Submit
              onPress={() => {
                if (selectedBill?.amount === '0' || selectedBill?.amount === '') {
                  setAmountError({
                    error: true,
                    errorMessage,
                  });
                } else {
                  setAmountError({
                    error: false,
                    errorMessage: '',
                  });
                }
              }}
              isLoading={validateQuery.isLoading}
              label="Continue"
            />
          </Form>
        </Container>
      </ScrollView>
    </>
  );
}
