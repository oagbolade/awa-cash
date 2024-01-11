import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';
import { Alert, Keyboard } from 'react-native';

import { handleError } from 'utils';

interface Props {
  error: FetchBaseQueryError | SerializedError | undefined;
  isError: boolean;
  isLoading: boolean;
  successMsg?: string;
  isPrivate?: boolean;
  isSuccess: boolean;
  errorTitle?: string;
  errorEffect?: () => void;
  successEffect?: () => void;
  reset?: () => void;
}

export default function useService({
  error,
  isError,
  isLoading,
  isSuccess,
  isPrivate,
  errorTitle,
  reset,
  successMsg,
  successEffect,
  errorEffect,
}: Props) {
  // const dispatch = useDispatch();

  useEffect(() => {
    let ignore = false;

    isLoading && Keyboard.dismiss();
    if (!isLoading && isSuccess) {
      successMsg && console.log(successMsg);
      successEffect?.();
    }

    if (!isLoading && isError) {
      if (!isPrivate && error) {
        if (__DEV__) {
          console.log(error);
        }
        const errorMsg = handleError(error);

        !ignore && Alert.alert('', errorMsg);
        // dispatch(
        //   showToast({
        //     duration: 'long',
        //     message: errorMsg,
        //     title: errorTitle?.toLocaleUpperCase() || 'Error',
        //     type: 'error',
        //   }),
        // );
      } else {
        console.log('Error:', error);
      }
      errorEffect?.();
    }

    return () => {
      reset?.();
      ignore = true;
    };
  }, [
    isLoading,
    isSuccess,
    isError,
    successEffect,
    errorEffect,
    successMsg,
    isPrivate,
    error,
    errorTitle,
    reset,
  ]);
}
