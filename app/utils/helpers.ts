import { RouteProp } from '@react-navigation/native';
import type { ErrorResponse } from 'api-response';

import { TabRoutes } from 'navigation';

type TabIcon = Extract<
  IconName,
  'home' | 'security-safe' | 'wallet' | 'menu' | 'swap' | 'user' | 'moneys'
>;

export const getTabIcon = (route: RouteProp<TabRoutes, keyof TabRoutes>): TabIcon => {
  switch (route.name) {
    case 'Home': {
      return 'home';
    }
    case 'Savings': {
      return 'security-safe';
    }
    case 'Loans': {
      return 'wallet';
    }
    case 'More': {
      return 'menu';
    }
    default: {
      return 'home';
    }
  }
};

export const formatCurrency = (value: number | string): string => {
  let amount = typeof value === 'string' ? Number(value.replaceAll(',', '')) : value;

  if (Number.isNaN(amount)) {
    amount = 0;
  }

  return new Intl.NumberFormat('en-NG', {
    currency: 'NGN',
    minimumFractionDigits: 0,
    style: 'currency',
  }).format(amount);
};

export const abbreviateString = (string1: string): string => {
  const split_names = string1.trim().split(' ');

  if (split_names.length > 1) {
    return `${split_names[0]?.charAt(0) + '' + split_names[1]?.charAt(0)}`;
  }
  return split_names[0]?.charAt(0) || '';
};

export const loopedColor = (index: number, colors: string[]): string => {
  const colorLength = colors.length;
  const bodyNumber = index % colorLength;

  return colors[bodyNumber] as string;
};

export const handleError = (error: IError) => {
  if (__DEV__) {
    // console.log('Error:', { error });
    // console.log('Error:', JSON.stringify(error));
  }

  let errorMessage = '';

  if (!error.data && error.message) {
    errorMessage = error.message;
  }

  if (!errorMessage) {
    if (error.data) {
      const ErrorMsg = (error.data as ErrorResponse).message;
      const ErrorArray = (error.data as ErrorResponse).errors;

      if (ErrorMsg) {
        errorMessage = ErrorMsg;
      } else if (ErrorArray) {
        return ErrorArray[0];
      } else {
        return 'Something went wrong, try again later';
      }

      if (ErrorArray.length > 0) {
        return ErrorArray[0];
      }
    } else {
      return 'System was unable to process this request. Please try again later';
    }
  }

  return errorMessage;
};

export const getTimeOfDay = (): string => {
  const currentTime = new Date();
  const hour = currentTime.getHours();

  if (hour >= 5 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 18) {
    return 'afternoon';
  } else {
    return 'evening';
  }
};
