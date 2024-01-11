import { useState } from 'react';

import { PinNumpad } from 'components';
import { AuthRoutes, StackNavigationProps } from 'navigation';
import { useRegisterMutation, useService } from 'service';

export default function ConfirmPin({
  navigation,
  route,
}: StackNavigationProps<AuthRoutes, 'ConfirmPin'>): JSX.Element {
  const { params } = route;
  const [numError, setNumError] = useState({
    error: false,
    errorMessage: '',
  });

  const [register, { isSuccess, isError, error, isLoading }] = useRegisterMutation();

  useService({
    error,
    errorTitle: 'Registration Error',
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      navigation.navigate('AuthSuccess', { type: 'signup' });
    },
  });

  return (
    <PinNumpad
      title="Confirm Transaction Pin"
      subtitle="Enter your pin"
      isLoading={isLoading}
      error={numError.error}
      errorMessage={numError.errorMessage}
      onPinCompleted={confirmPin => {
        if (confirmPin.length >= 4) {
          console.log(confirmPin);
          if (confirmPin === params.pin) {
            register({ ...params, confirmPin });
          } else {
            setNumError({
              error: true,
              errorMessage: 'Pin Does not match',
            });
            console.log('err');
          }
        }
      }}
    />
  );
}
