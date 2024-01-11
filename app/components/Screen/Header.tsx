import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../General';

import { useHeaderHeight, useTheme } from 'hooks';
import { layout } from 'constant';

const { padding } = layout.spacing;

export interface HeaderProps {
  color?: string;
  onPress?: () => void;
  transparent?: boolean;
  hideBackIcon?: boolean;
  label?: string;
  iconColor?: string;
}

export default function Header({
  onPress,
  color: Color,
  hideBackIcon,
  iconColor,
  transparent,
  label,
}: HeaderProps): JSX.Element | null {
  const { insets, headerHeight } = useHeaderHeight();
  const { color } = useTheme();
  const navigation = useNavigation();

  const handleBackIcon = () => navigation.canGoBack() && navigation.goBack();

  const backgroundColor = transparent ? 'transparent' : Color || color.card;

  return (
    <>
      <View style={{ backgroundColor, height: insets.top }} />
      <View
        style={[
          styles.header,
          {
            backgroundColor,
            height: headerHeight - insets.top,
            paddingHorizontal: padding / 2,
          },
        ]}>
        {navigation.canGoBack() && !hideBackIcon && (
          <TouchableOpacity
            onPress={() => {
              handleBackIcon();
              onPress && onPress();
            }}>
            <Ionicons size={20} color={iconColor} name="arrow-back-outline" />
          </TouchableOpacity>
        )}
        <View style={styles.label}>
          <Text color={iconColor} variant="bold-700" textTransform="capitalize">
            {label}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -1,
  },
});
