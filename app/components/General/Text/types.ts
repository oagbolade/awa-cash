import { TextProps, TextStyle } from 'react-native';

export type TextStyleType = TextStyle | TextStyle[];

type Variants = 'title' | 'body' | 'reg-400' | 'medium-500' | 'bold-700';

type Font = 'DMSansBold' | 'DMSansMedium' | 'DMSansRegular';

export interface Props extends TextProps {
  children: React.ReactNode;
  style?: TextStyleType;
  variant?: Variants;
  color?: string;
  size?: number;
  lineHeight?: number;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  // family?: 'QS' | 'SSP';
}

export interface TextStyleProps {
  fontFamily?: Font;
  fontSize?: number;
}
