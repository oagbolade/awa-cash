import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

interface Props {
  children: JSX.Element;
  disabled?: boolean;
  onPress?: () => void;
}

export default function Touchable({
  children,
  onPress,
  disabled,
}: Props): JSX.Element | null {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        {...{ disabled, onPress }}
        background={TouchableNativeFeedback.Ripple('#33333333', true)}>
        {children}
      </TouchableNativeFeedback>
    );
  }
  return <TouchableOpacity {...{ disabled, onPress }}>{children}</TouchableOpacity>;
}
