import { SelectAccount } from '../Components';

import { StackNavigationProps, TransferRoutes } from 'navigation';

export default function MyAccountSelect({
  navigation,
}: StackNavigationProps<TransferRoutes, 'MyAccountSelect'>): JSX.Element {
  return (
    <SelectAccount
      onPress={account => {
        navigation.navigate('MyAccountTransfer', { account });
      }}
    />
  );
}
