import { Text as RNText } from 'react-native';

import { Props, TextStyleProps, TextStyleType } from './types';

import { useTheme } from 'hooks';
import { layout } from 'constant';

const { fonts } = layout;

export default function Text({
  children,
  style,
  color,
  variant,
  size,
  lineHeight,
  textTransform,
  textAlign,
  ...props
}: Props): JSX.Element {
  const { color: colors } = useTheme();
  let textStyle: TextStyleProps = {};

  const defaultStyle: TextStyleType = {
    color: color || colors.text,
    lineHeight: lineHeight || undefined,
  };

  switch (variant) {
    case 'medium-500': {
      textStyle = {
        ...defaultStyle,
        fontFamily: 'DMSansMedium',
        fontSize: size || fonts.subhead,
      };
      break;
    }
    case 'title': {
      textStyle = {
        ...defaultStyle,
        fontFamily: 'DMSansBold',
        fontSize: size || fonts.largeTitle,
      };
      break;
    }
    case 'body': {
      textStyle = {
        ...defaultStyle,
        fontFamily: 'DMSansRegular',
        fontSize: fonts.body,
      };
      break;
    }
    case 'bold-700': {
      textStyle = {
        ...defaultStyle,
        fontFamily: 'DMSansBold',
        fontSize: size || fonts.body,
      };
      break;
    }
    case 'reg-400': {
      textStyle = {
        ...defaultStyle,
        fontFamily: 'DMSansRegular',
        fontSize: size || fonts.body,
      };
      break;
    }
    default: {
      textStyle = {
        ...defaultStyle,
        fontFamily: 'DMSansRegular',
        fontSize: size || fonts.callout,
      };
    }
  }

  return (
    <RNText style={[textStyle, { textAlign, textTransform }, style]} {...props}>
      {children}
    </RNText>
  );
}
