import { SelectAccount } from '../Components';

import { BillRoutes, StackNavigationProps } from 'navigation';

export default function BillSelectAccount({
  navigation,
  route,
}: StackNavigationProps<BillRoutes, 'BillSelectAccount'>): JSX.Element {
  const { params } = route;

  return (
    <SelectAccount
      onPress={account => {
        navigation.navigate('BillerConfirmation', {
          account,
          ...params,
        });
      }}
    />
  );
}
