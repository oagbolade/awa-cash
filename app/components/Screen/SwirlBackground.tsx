import { ImageBackground, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { useHeaderHeight } from 'hooks';
import { pallets } from 'constant';

interface Props extends ViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function SwirlBackground({
  children,
  style,
  ...props
}: Props): JSX.Element | null {
  const { insets } = useHeaderHeight();
  return (
    <ImageBackground
      source={require('assets/images/app/pin-bg.png')}
      style={[styles.container, style]}
      {...props}>
      <View style={{ marginTop: insets.top }} />
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: pallets.primary,
    flex: 1,
  },
});
