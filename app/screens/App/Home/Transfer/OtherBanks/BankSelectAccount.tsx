import { SelectAccount } from '../Components';

import { StackNavigationProps, TransferRoutes } from 'navigation';

export default function BankSelectAccount({
  navigation,
  route,
}: StackNavigationProps<TransferRoutes, 'BankSelectAccount'>): JSX.Element {
  const { params } = route;

  return (
    <SelectAccount
      onPress={account => {
        navigation.navigate('BankTransfer', {
          account,
          ...params,
        });
      }}
    />
  );
}
