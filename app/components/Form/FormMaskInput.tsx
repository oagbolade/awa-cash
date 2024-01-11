import { forwardRef } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaskInput, { MaskInputProps, createNumberMask } from 'react-native-mask-input';

import { Text } from '../General';

import { layout, pallets } from 'constant';
import { Icon } from 'assets';
import { useTheme } from 'hooks';

const { height, inputRadius, borderSize } = layout.input;
const { fonts } = layout;

export interface FormMaskInputProps extends MaskInputProps {
  label: string;
  value?: string;
  error?: boolean;
  errorMessage?: string;
  marginBottom?: number;
  labelColor?: string;
  disabled?: boolean;
  valid?: boolean;
  note?: string;
  noteVisible?: boolean;
  noteColor?: 'text' | 'primary';
  noteWeight?: 'reg' | 'bold';
  placeholder?: string;
  isLoading?: boolean;
  isError?: boolean;
  isErrorMessage?: string;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
  editable?: boolean;
}

const nairaMask = createNumberMask({
  delimiter: ',',
  precision: 0,
  prefix: ['₦ '],
  separator: '.',
});

const FormMaskInput = forwardRef<TextInput, FormMaskInputProps>(function (
  {
    label,
    value,
    onChangeText,
    error,
    labelColor,
    marginBottom = 16,
    isLoading,
    isError,
    isErrorMessage,
    errorMessage,
    disabled: dsb,
    note,
    rightIcon,
    onRightIconPress,
    noteVisible,
    editable = true,
    placeholder,
    noteColor,
    noteWeight,
    ...props
  }: FormMaskInputProps,
  ref,
): JSX.Element | null {
  const { color } = useTheme();
  const disabled = isLoading || dsb || isError || !editable;

  return (
    <>
      <Text
        variant="reg-400"
        size={fonts.subhead}
        color={disabled ? color.grey : error ? color.red : color.textSecondary}
        style={{
          marginBottom: 8,
          paddingLeft: 5,
        }}>
        {label}
      </Text>
      <View
        style={[
          styles.container,
          {
            backgroundColor: error ? `${color.red}10` : color.input,
            borderColor: disabled
              ? color.transparent
              : error
              ? color.red
              : color.transparent,
          },
        ]}>
        <MaskInput
          mask={nairaMask}
          editable={!disabled}
          placeholder={placeholder || label}
          placeholderTextColor={labelColor || pallets.grey2}
          style={[
            styles.input,
            {
              color: disabled ? color.grey : color.text,
              fontFamily: 'DMSansRegular',
              height: '100%',
            },
          ]}
          {...{ onChangeText, ref, value, ...props }}
        />
        {isLoading && <ActivityIndicator size="small" />}
        {rightIcon && (
          <TouchableOpacity activeOpacity={0.7} onPress={onRightIconPress}>
            <Icon name={rightIcon} size={16} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: error ? 8 : marginBottom,
          marginTop: isError || noteVisible || error ? 10 : 0,
        }}>
        {error && !isError && (
          <View
            style={{
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <Text textAlign="right" size={fonts.caption2} color={color.red}>
              {errorMessage}
            </Text>
          </View>
        )}
        {isError && (
          <>
            <Icon name="info" size={20} style={{ marginRight: 10 }} color={pallets.red} />
            <Text size={fonts.subhead} style={{ flex: 1 }} color={color.red}>
              {isErrorMessage}
            </Text>
          </>
        )}
        {noteVisible && !error && !isError && (
          <View style={styles.note}>
            <Text
              variant={noteWeight === 'bold' ? 'bold-700' : undefined}
              size={fonts.subhead}
              color={noteColor === 'primary' ? color.primary : color.text}>
              {note}
            </Text>
          </View>
        )}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: inputRadius,
    borderWidth: borderSize,
    flexDirection: 'row',
    height,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
  },
  note: {
    alignItems: 'flex-end',
    flex: 1,
  },
});

export default FormMaskInput;
