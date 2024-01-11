import { useState } from 'react';

import { PinNumpad } from 'components';
import { AuthRoutes, StackNavigationProps } from 'navigation';
import { useRegisterAwacashMutation, useService } from 'service';

export default function AwacashConfirmPin({
  route,
  navigation,
}: StackNavigationProps<AuthRoutes, 'AwacashConfirmPin'>): JSX.Element {
  const { params } = route;
  const [numError, setNumError] = useState({
    error: false,
    errorMessage: '',
  });
  const [register, { isSuccess, isError, error, isLoading }] =
    useRegisterAwacashMutation();

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
      title="Confirm your Pin"
      subtitle="Enter your pin"
      error={numError.error}
      errorMessage={numError.errorMessage}
      onPinCompleted={confirmPin => {
        if (confirmPin.length >= 4) {
          console.log(confirmPin);
          if (confirmPin === params.pin) {
            register({ ...params, confirmPin });
            setNumError({
              error: false,
              errorMessage: '',
            });
          } else {
            setNumError({
              error: true,
              errorMessage: 'Pin Does not match',
            });
            console.log('err');
          }
        }
      }}
      secured
      isLoading={isLoading}
    />
  );
}
