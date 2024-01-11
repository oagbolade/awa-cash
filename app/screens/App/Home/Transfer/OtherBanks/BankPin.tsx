import { useState } from 'react';

import { StackNavigationProps, TransferRoutes } from 'navigation';
import { PinNumpad } from 'components';
import { useInterBankMutation, useService } from 'service';

export default function BankPin({
  navigation,
  route,
}: StackNavigationProps<TransferRoutes, 'BankPin'>): JSX.Element {
  const [date, setDate] = useState(Date.now());
  const { params } = route;
  const [transfer, { isError, isLoading, isSuccess, data, error }] =
    useInterBankMutation();

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      if (data) {
        navigation.navigate('TransferSuccess', {
          account: params.account,
          accountName: params.accountName,
          accountNumber: params.accountNumber,
          amount: params.amount,
          bankName: params.bank.name,
          date,
          narration: params.details,
          transactionReference: data.data.transactionReference,
        });
      }
    },
  });

  return (
    <PinNumpad
      title="Transaction Pin"
      subtitle="Enter your pin"
      isLoading={isLoading}
      onPinCompleted={pin => {
        if (pin.length >= 4) {
          setDate(Date.now());

          transfer({
            addAsBeneficary: params.beneficiary,
            amount: Number(params.amount),
            bankCode: params.bank.code,
            creditAccount: params.accountNumber,
            debitAccount: params.account,
            narration: params.details,
            transactionPin: pin,
            transactionReference: new Date(date).toISOString(),
          });
        }
      }}
    />
  );
}
