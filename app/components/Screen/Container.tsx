import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import Header, { HeaderProps } from './Header';

import { layout } from 'constant';
import useTheme from 'hooks/useTheme';
import { useHeaderHeight } from 'hooks';

const { padding: pd } = layout.spacing;

interface ContainerProps extends ViewProps {
  children?: React.ReactNode;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  style?: ViewProps['style'];
  padding?: number;
  backgroundColor?: string;
  topInset?: boolean;
  header?: boolean;
  headerOptions?: HeaderProps;
  paddingHorizontal?: number;
}

export default function Container({
  alignItems,
  children,
  style,
  padding = pd,
  backgroundColor,
  topInset,
  header,
  headerOptions,
  paddingHorizontal,
  ...props
}: ContainerProps): JSX.Element | null {
  const { color } = useTheme();
  const { insets } = useHeaderHeight();

  return (
    <>
      {header && <Header {...headerOptions} />}
      {topInset && !header && <View style={{ backgroundColor, height: insets.top }} />}
      <View
        style={[
          { padding, paddingHorizontal },
          style,
          styles.container,
          {
            alignItems,
            backgroundColor: backgroundColor || color.background,
          },
        ]}
        {...props}>
        {children}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
