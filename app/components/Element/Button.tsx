import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

import { Text } from '../General';

import { layout, pallets } from 'constant';

const { height, radius } = layout.button;
const { callout } = layout.fonts;

type Variants = 'secondary' | 'outline' | 'transparent';

export interface ButtonProps {
  variant?: Variants;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  marginBottom?: number;
  color?: string;
  labelColor?: string;
  isLoading?: boolean;
  width?: `${number}%`;
}

interface TouchableProps {
  children: JSX.Element;
}

//TODO: Refactor this component
// eslint-disable-next-line sonarjs/cognitive-complexity
function Button({
  disabled: buttonDisabled,
  label,
  onPress,
  variant,
  marginBottom = 0,
  labelColor,
  color: Color,
  isLoading = false,
  width = '100%',
}: ButtonProps): JSX.Element | null {
  const buttonStyle: ViewStyle = {};
  const disabled = buttonDisabled || isLoading;

  let textColor: string = pallets.white;

  switch (variant) {
    case 'secondary': {
      buttonStyle.backgroundColor = Color || pallets.white;
      textColor = Color ? pallets.white : pallets.primary;
      break;
    }
    case 'transparent': {
      buttonStyle.backgroundColor = pallets.transparent;
      textColor = Color || pallets.primary;
      break;
    }
    case 'outline': {
      buttonStyle.borderColor = Color || pallets.primary;
      buttonStyle.borderWidth = 1.5;
      textColor = Color || pallets.primary;
      break;
    }
    default: {
      buttonStyle.backgroundColor = pallets.primary;
      textColor = pallets.white;
      break;
    }
  }

  const Touchable = ({ children }: TouchableProps): JSX.Element => {
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
  };

  if (buttonDisabled) {
    buttonStyle.opacity = 0.8;
    buttonStyle.backgroundColor = Color || pallets.grey;
  }

  if (isLoading) {
    buttonStyle.backgroundColor =
      variant === 'transparent' ? pallets.transparent : pallets.grey;
  }

  const transparentColor = Color || pallets.primary;

  return (
    <View style={[styles.control, buttonStyle, { marginBottom, width }]}>
      <Touchable>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={variant === 'transparent' ? transparentColor : pallets.white}
            />
          ) : (
            <Text size={callout} variant="bold-700" color={labelColor || textColor}>
              {label}
            </Text>
          )}
        </View>
      </Touchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height,
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  control: {
    alignSelf: 'center',
    borderRadius: radius,
  },
});

export default React.memo(Button);
