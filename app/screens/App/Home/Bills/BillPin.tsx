import { PinNumpad } from 'components';
import { BillRoutes, StackNavigationProps } from 'navigation';
import {
  useBuyAirtimeMutation,
  useGetTransferFeeQuery,
  usePayBillsMutation,
  useService,
} from 'service';

export default function BillPin({
  navigation,
  route,
}: StackNavigationProps<BillRoutes, 'BillPin'>): JSX.Element {
  const {
    account,
    amount,
    customerEmail,
    customerId,
    customerMobile,
    paymentCode,
    type,
    label,
  } = route.params;
  const [payBill, payBillQuery] = usePayBillsMutation();
  const [buyAirtime, buyAirtimeQuery] = useBuyAirtimeMutation();
  const feeQuery = useGetTransferFeeQuery({
    amount: (Number(amount) || 0) / 100,
    type,
  });

  useService({
    error: payBillQuery.error,
    errorEffect() {
      payBillQuery.reset();
      buyAirtimeQuery.reset();
    },
    isError: payBillQuery.isError,
    isLoading: payBillQuery.isLoading,
    isSuccess: payBillQuery.isSuccess,
    reset() {
      payBillQuery.reset();
      buyAirtimeQuery.reset();
    },
    successEffect() {
      payBillQuery.reset();
      buyAirtimeQuery.reset();
      navigation.navigate('BillSuccess', {
        account,
        amount,
        customerEmail,
        customerId,
        customerMobile,
        label,
        resMessage: payBillQuery.data?.data.responseMessage || '',
        tRef: payBillQuery.data?.data.transactionRef || '',
      });
    },
  });

  useService({
    error: buyAirtimeQuery.error,
    errorEffect() {
      buyAirtimeQuery.reset();
      payBillQuery.reset();
    },
    isError: buyAirtimeQuery.isError,
    isLoading: buyAirtimeQuery.isLoading,
    isSuccess: buyAirtimeQuery.isSuccess,
    reset() {
      buyAirtimeQuery.reset();
      payBillQuery.reset();
    },
    successEffect() {
      buyAirtimeQuery.reset();
      payBillQuery.reset();
      navigation.navigate('BillSuccess', {
        account,
        amount,
        customerEmail,
        customerId,
        customerMobile,
        label,
        resMessage: buyAirtimeQuery.data?.data.responseMessage || '',
        tRef: buyAirtimeQuery.data?.data.transactionRef || '',
      });
    },
  });

  useService({
    error: feeQuery.error,
    isError: feeQuery.isError,
    isLoading: feeQuery.isLoading,
    isSuccess: feeQuery.isSuccess,
  });

  return (
    <PinNumpad
      title="Transaction Pin"
      subtitle="Enter your pin"
      secured
      isLoading={payBillQuery.isLoading || buyAirtimeQuery.isLoading}
      onPinCompleted={pin => {
        if (pin.length >= 4) {
          //   setDate(Date.now());
          //   transfer({
          //     addAsBeneficary: false,
          //     amount: Number(params.amount),
          //     creditAccount: params.accountNumber,
          //     debitAccount: params.account,
          //     narration: params.details,
          //     transactionPin: pin,
          //     transactionReference: new Date(date).toISOString(),
          //   });
          if (type === 3) {
            buyAirtime({
              accountNumber: account,
              amount,
              customerMobile: customerId,
              paymentCode,
              pin,
            });
          }

          if (type === 4) {
            payBill({
              accountNumber: account,
              amount,
              customerEmail,
              customerId,
              customerMobile,
              paymentCode,
              pin,
            });
          }
        }
      }}
    />
  );
}
