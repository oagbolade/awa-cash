import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  AltHeader,
  Container,
  Divider,
  Form,
  FormField,
  FormMaskField,
  FormPicker,
  FormSwitch,
  Submit,
  TagTitle,
  VirtualScroll,
} from 'components';
import { pallets } from 'constant';
import { StackNavigationProps, TransferRoutes } from 'navigation';
import { useGetBanksQuery, useInterNameEnquiryMutation, useService } from 'service';
import { bankTransferValidationSchema } from 'utils';

export default function BankTransfer({
  navigation,
  route,
}: StackNavigationProps<TransferRoutes, 'BankTransfer'>): JSX.Element {
  const { params } = route;
  const bankQuery = useGetBanksQuery();
  const [selectedBank, settSelectedBank] = useState<PickerItemProps | null>(null);
  const [enquiry, { isError, isLoading, isSuccess, data, error }] =
    useInterNameEnquiryMutation();

  useFocusEffect(
    useCallback(() => {
      if (params.beneficiary) {
        console.log('sheesh', params.beneficiary);
        enquiry({
          accountNumber: params.beneficiary.accountNumber,
          bankCode: params.beneficiary.bankCode,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
  });

  useService({
    error: bankQuery.error,
    isError: bankQuery.isError,
    isLoading: bankQuery.isLoading,
    isSuccess: bankQuery.isSuccess,
  });

  return (
    <>
      <AltHeader color={pallets.primary} label="Bank Transfer" />
      <VirtualScroll>
        <Container backgroundColor="transparent">
          <TagTitle title="Enter Details" marginBottom={40} />
          <Form
            validationSchema={bankTransferValidationSchema}
            initialValues={{
              accountNumber: params.beneficiary?.accountNumber || '',
              amount: '',
              bank: {
                label:
                  params.beneficiary?.bankName ||
                  bankQuery.data?.data?.find(
                    i => i.bankCode === params?.beneficiary?.bankCode,
                  )?.bankName ||
                  '',
                value: params.beneficiary?.bankCode || '',
              } as PickerItemProps,
              details: '',
              save: false,
            }}
            onSubmit={val => {
              console.log(val);
              if (isSuccess && data?.data.name) {
                navigation.navigate('BankConfirmation', {
                  account: params.account,
                  accountName: data?.data.name,
                  accountNumber: val.accountNumber,
                  amount: val.amount,
                  bank: { code: val.bank.value, name: val.bank.label },
                  beneficiary: val.save,
                  details: val.details,
                });
              }
            }}>
            <FormPicker
              search
              items={bankQuery.data?.data.map(item => ({
                label: item.bankName,
                value: item.bankCode,
              }))}
              onSelect={item => {
                console.log(item);
                settSelectedBank(item);
              }}
              name="bank"
              label="Bank"
              placeholder="Select Bank"
              isLoading={bankQuery.isLoading}
            />
            <FormField
              onTextChange={text => {
                if (text.length === 10) {
                  console.log(text);
                  if (selectedBank) {
                    enquiry({ accountNumber: text, bankCode: selectedBank.value });
                  }
                }
              }}
              keyboardType="number-pad"
              name="accountNumber"
              label="Account Number"
              isLoading={isLoading}
              note={data?.data.name}
              noteVisible={isSuccess}
              maxLength={10}
            />
            <FormMaskField keyboardType="number-pad" name="amount" label="Amount" />
            <FormField name="details" label="Details" />
            <FormSwitch name="save" label="Save as beneficiary" />
            <Divider />
            <Submit label="Next" />
          </Form>
        </Container>
      </VirtualScroll>
    </>
  );
}
