import { View } from 'react-native';

import { Text } from '../General';

import Divider from './Divider';

import { layout, pallets } from 'constant';

interface TitleProps {
  title: string;
  subtitle?: string;
  marginBottom?: number;
  color?: string;
  subColor?: string;
}

const { fonts, spacing } = layout;

export default function Title({
  title,
  subtitle,
  marginBottom = spacing.xxl,
  color,
  subColor,
}: TitleProps): JSX.Element | null {
  return (
    <View style={{ marginBottom }}>
      <Text variant="bold-700" size={fonts.title2} {...{ color }}>
        {title}
      </Text>
      <Divider space="t" />
      {subtitle && (
        <Text size={fonts.subhead} color={subColor || pallets.grey}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}
