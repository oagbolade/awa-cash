import { PinNumpad } from 'components';
import { AuthRoutes, StackNavigationProps } from 'navigation';

export default function AwacashCreatePin({
  navigation,
  route,
}: StackNavigationProps<AuthRoutes, 'AwacashCreatePin'>): JSX.Element {
  const { params } = route;

  return (
    <PinNumpad
      title="Create Transaction Pin"
      subtitle="Enter your pin"
      onPinCompleted={pin => {
        if (pin.length >= 4) {
          navigation.navigate('AwacashConfirmPin', {
            ...params,
            pin,
          });
        }
      }}
      secured
    />
  );
}
