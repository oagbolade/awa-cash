import { SelectAccount } from '../Components';

import { StackNavigationProps, TransferRoutes } from 'navigation';

export default function AwacashSelectAccount({
  navigation,
  route,
}: StackNavigationProps<TransferRoutes, 'AwacashSelectAccount'>): JSX.Element {
  const { params } = route;

  return (
    <SelectAccount
      onPress={account => {
        navigation.navigate('AwacashTransfer', {
          account,
          ...params,
        });
      }}
    />
  );
}
