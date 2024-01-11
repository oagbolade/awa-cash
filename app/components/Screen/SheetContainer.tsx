import { StyleSheet, View } from 'react-native';

import { useTheme } from 'hooks';
import { layout } from 'constant';

const { spacing, window } = layout;

interface SheetContainerProps {
  children: React.ReactNode;
}

export default function SheetContainer({ children }: SheetContainerProps): JSX.Element {
  const { color } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: spacing.l,
    borderTopRightRadius: spacing.l,
    bottom: 0,
    flex: 1,
    marginTop: -spacing.l,
    width: window.width,
  },
});
