import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import {
  AltHeader,
  Container,
  Divider,
  Form,
  FormField,
  FormMaskField,
  FormSwitch,
  Submit,
  TagTitle,
  VirtualScroll,
} from 'components';
import { pallets } from 'constant';
import { StackNavigationProps, TransferRoutes } from 'navigation';
import { useLocalNameEnquiryMutation, useService } from 'service';
import { awacashTransferValidationSchema } from 'utils';

export default function AwacashTransfer({
  navigation,
  route,
}: StackNavigationProps<TransferRoutes, 'AwacashTransfer'>): JSX.Element {
  const { params } = route;
  const [enquiry, { isError, isLoading, isSuccess, data, error }] =
    useLocalNameEnquiryMutation();

  useFocusEffect(
    useCallback(() => {
      if (params.beneficiary) {
        console.log('sheesh', params.beneficiary);
        enquiry(params.beneficiary.accountNumber);
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

  return (
    <>
      <AltHeader color={pallets.primary} label="Awacash Transfer" />
      <VirtualScroll>
        <Container backgroundColor="transparent">
          <TagTitle title="Enter Details" marginBottom={40} />
          <Form
            validationSchema={awacashTransferValidationSchema}
            initialValues={{
              accountNumber: params.beneficiary?.accountNumber || '',
              amount: '',
              details: '',
              save: false,
            }}
            onSubmit={val => {
              if (data?.data) {
                navigation.navigate('AwacashTransferConfirmation', {
                  account: params.account,
                  accountName: data.data.name,
                  accountNumber: val.accountNumber,
                  amount: val.amount,
                  bankName: 'Awacash',
                  beneficiary: val.save,
                  details: val.details,
                });
              }
            }}>
            <FormField
              onTextChange={text => {
                if (text.length === 10) {
                  console.log(text);
                  enquiry(text);
                }
              }}
              name="accountNumber"
              label="Account Number"
              isLoading={isLoading}
              keyboardType="number-pad"
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
