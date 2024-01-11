import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { Divider, Form, FormField, FormPicker, Submit } from 'components';
import { useGetDataBillersQuery, useGetPaymentItemQuery } from 'service';
import { dataValidationSchema } from 'utils';
import { BillRoutes, useStackNavigationProp } from 'navigation';
import FormMaskInput from 'components/Form/FormMaskInput';

export default function Data(): JSX.Element {
  const [billerId, setBillerId] = useState<string>('');
  const [amount, setAmount] = useState('');
  const navigation = useNavigation<useStackNavigationProp<BillRoutes, 'AirtimeOrData'>>();
  const { data, isLoading } = useGetDataBillersQuery();

  const packageQuery = useGetPaymentItemQuery(
    {
      billerId,
    },
    { skip: billerId === '' },
  );

  return (
    <View style={styles.container}>
      <Form
        validationSchema={dataValidationSchema}
        enableReinitialize
        initialValues={{
          network: undefined as unknown as PickerItemProps,
          package: undefined as unknown as PickerItemProps,
          phoneNumber: '',
        }}
        onSubmit={val => {
          console.log(val);
          const amountInKobo = Number(amount || 0) * 100;

          navigation.navigate('BillSelectAccount', {
            amount: String(amountInKobo),
            customerEmail: '',
            customerId: val.phoneNumber,
            customerMobile: '',
            fullName: val.package.label,
            label: 'Phone Number',
            paymentCode: val.package.value2 || '',
            type: 4,
          });
        }}>
        <FormPicker
          items={
            data?.data?.map?.(i => ({
              label: i.billername,
              value: i.productCode,
              value2: i.billerid,
            })) || []
          }
          onSelect={i => {
            setBillerId(i.value2 || '');
          }}
          label="Select Network"
          name="network"
          isLoading={isLoading}
        />
        <FormPicker
          isLoading={packageQuery.isLoading || packageQuery.isFetching}
          items={
            packageQuery.data?.data.map(i => ({
              label: i.paymentitemname,
              value: i.amount,
              value2: i.paymentCode,
            })) || []
          }
          label="Select Package"
          onSelect={item => {
            const amt = item.value === '0' ? '' : String(Number(item.value || 0) / 100);

            setAmount(amt);
          }}
          name="package"
        />
        <FormField label="Mobile" name="phoneNumber" />
        <FormMaskInput
          label="Amount"
          value={amount}
          onChangeText={(_, text) => setAmount(text)}
          editable={false}
        />
        <Divider />
        <Submit label="Continue" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
});
