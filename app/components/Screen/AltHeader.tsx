import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../General';

import { useHeaderHeight, useTheme } from 'hooks';
import { layout, pallets } from 'constant';

const { fonts, spacing } = layout;

export interface AltHeaderProps {
  color?: string;
  onPress?: () => void;
  transparent?: boolean;
  hideBackIcon?: boolean;
  label?: string;
  iconColor?: string;
}

export default function AltHeader({
  onPress,
  color: Color,
  hideBackIcon,
  iconColor = pallets.white,
  transparent,
  label,
}: AltHeaderProps): JSX.Element | null {
  const { insets, headerHeight } = useHeaderHeight();
  const { color } = useTheme();
  const navigation = useNavigation();

  const handleBackIcon = () => navigation.canGoBack() && navigation.goBack();

  const backgroundColor = transparent ? 'transparent' : Color || color.primary;

  return (
    <>
      <View style={{ backgroundColor, height: insets.top }} />
      <View
        style={[
          styles.header,
          {
            backgroundColor,
            height: headerHeight - insets.top,
            paddingHorizontal: spacing.padding / 2,
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
          <View style={styles.labelTextBox}>
            <Text
              color={iconColor}
              variant="bold-700"
              size={label && label?.length > 35 ? fonts.subhead : fonts.body}
              textAlign="center"
              textTransform="capitalize">
              {label}
            </Text>
          </View>
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
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: -1,
  },
  labelTextBox: {
    alignItems: 'center',
    width: '80%',
  },
});
