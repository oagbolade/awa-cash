import { StyleSheet, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import { useFormikContext } from 'formik';

import { Text } from '../General';

import { useTheme } from 'hooks';
import { layout, pallets } from 'constant';
interface PinFieldKeys {
  pin: string;
  otp: string;
  confirmPin: string;
  code: string;
}

interface FormPinProps {
  name: keyof PinFieldKeys;
  onTextChange?: (text: string) => void;
  cellCount?: number;
  marginBottom?: number;
}

const { subhead, footnote } = layout.fonts;

function FormPin({
  name,
  onTextChange,
  cellCount = 4,
  marginBottom = 20,
}: FormPinProps): JSX.Element | null {
  const { setFieldTouched, setFieldValue, errors, touched, handleSubmit, values } =
    useFormikContext<PinFieldKeys>();

  const pinRef = useBlurOnFulfill({ cellCount, value: values[name] });
  const { color } = useTheme();

  const error = !!(errors[name] && touched[name]);

  return (
    <>
      <CodeField
        caretHidden={false}
        ref={pinRef}
        value={values[name]}
        onEndEditing={() => handleSubmit()}
        onSubmitEditing={() => {
          values[name].length === cellCount && handleSubmit();
        }}
        onChangeText={text => {
          setFieldValue(name, text);
          onTextChange?.(text);
        }}
        {...{ cellCount }}
        onBlur={() => setFieldTouched(name, true)}
        rootStyle={styles.container}
        keyboardType="number-pad"
        textContentType="password"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[
              styles.input,
              isFocused
                ? { borderBottomWidth: 2, borderColor: color.primary }
                : {
                    borderColor: color.grey,
                  },
              error
                ? {
                    borderColor: color.red,
                  }
                : {},
            ]}>
            <Text size={subhead} variant="body" color={color.text}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      {error && (
        <View style={styles.errorBox}>
          <Text size={footnote} color={pallets.red}>
            {errors[name]}
          </Text>
        </View>
      )}
      <View style={{ marginBottom: marginBottom }} />
    </>
  );
}

const INP_SIZE = layout.input.height - 12;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBox: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  input: {
    alignItems: 'center',
    borderBottomWidth: 1,
    height: INP_SIZE,
    justifyContent: 'center',
    margin: 10,
    width: INP_SIZE,
  },
});

export default FormPin;
