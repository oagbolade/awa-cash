import { useState } from 'react';

import { StackNavigationProps, TransferRoutes } from 'navigation';
import { PinNumpad } from 'components';
import { useLocalTransferMutation, useService } from 'service';

export default function AwacashTransferPin({
  navigation,
  route,
}: StackNavigationProps<TransferRoutes, 'AwacashTransferPin'>): JSX.Element {
  const [date, setDate] = useState(Date.now());
  const { params } = route;
  const [transfer, { isError, isLoading, isSuccess, data, error }] =
    useLocalTransferMutation();

  console.log(params);

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
          bankName: params.bankName,
          date,
          narration: params.details,
          transactionReference: data.data,
        });
      }
    },
  });

  return (
    <PinNumpad
      title="Transaction Pin"
      subtitle="Enter your pin"
      isLoading={isLoading}
      secured
      onPinCompleted={pin => {
        if (pin.length >= 4) {
          setDate(Date.now());

          transfer({
            addAsBeneficary: params.beneficiary,
            amount: Number(params.amount),
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
