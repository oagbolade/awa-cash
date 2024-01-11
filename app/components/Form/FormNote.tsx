//NOTE: DO NOT USE
import { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { useFormikContext } from 'formik';

import { Text } from '../General';

import { layout, pallets } from 'constant';
import { useTheme } from 'hooks';
import { Icon } from 'assets/icons';

interface FieldKeys {
  notes: string;
  details: string;
}

interface FormNoteProps extends TextInputProps {
  name: keyof FieldKeys;
  label?: string;
  marginBottom?: number;
  onTextChange?: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const { fonts, input } = layout;

/**
 * @deprecated Use the multiline props in the FormField
 */

const FormNote = forwardRef<TextInput, FormNoteProps>(function (
  { name, label, onTextChange, marginBottom, disabled, ...props }: FormNoteProps,
  ref,
): JSX.Element | null {
  const { color } = useTheme();

  const { setFieldTouched, setFieldValue, errors, touched, handleSubmit, values } =
    useFormikContext<FieldKeys>();

  const error = Boolean(errors[name]) && Boolean(touched[name]);

  return (
    <>
      <Text
        variant="reg-400"
        size={fonts.subhead}
        color={disabled ? color.border : error ? color.red : color.textSecondary}
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
            borderColor: disabled ? color.border : error ? color.red : color.transparent,
          },
        ]}>
        <TextInput
          editable={!disabled}
          ref={ref}
          onChangeText={text => {
            setFieldValue(name, text);
            onTextChange?.(text);
          }}
          multiline
          onBlur={() => setFieldTouched(name)}
          style={[
            styles.input,
            {
              color: color.text,
            },
          ]}
          onSubmitEditing={() => handleSubmit()}
          placeholderTextColor={pallets.grey2}
          placeholder={'TESTING'}
          value={values[name]}
          {...props}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom,
          marginTop: 6,
        }}>
        {error && (
          <>
            <Icon name="info" size={20} style={{ marginRight: 10 }} color={pallets.red} />
            <Text size={fonts.subhead} style={{ flex: 1 }} color={color.red}>
              {errors[name]}
            </Text>
          </>
        )}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: input.inputRadius,
    borderWidth: input.borderSize,
    flexDirection: 'row',
    maxHeight: input.height * 3,
    minHeight: input.height,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  input: {
    alignSelf: 'center',
    flex: 1,
    fontFamily: 'DMSansRegular',
  },
});

export default FormNote;
