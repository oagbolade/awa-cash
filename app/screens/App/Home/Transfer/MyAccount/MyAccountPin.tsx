import { useState } from 'react';

import { StackNavigationProps, TransferRoutes } from 'navigation';
import { PinNumpad } from 'components';
import { useLocalTransferMutation, useService } from 'service';

export default function MyAccountPin({
  navigation,
  route,
}: StackNavigationProps<TransferRoutes, 'MyAccountPin'>): JSX.Element {
  const [date, setDate] = useState(Date.now());
  const { params } = route;
  const [transfer, { isError, isLoading, isSuccess, data, error }] =
    useLocalTransferMutation();

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
      onPinCompleted={pin => {
        if (pin.length >= 4) {
          setDate(Date.now());

          transfer({
            addAsBeneficary: false,
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
