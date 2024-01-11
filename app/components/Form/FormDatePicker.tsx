import { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Picker, { DateTimePickerProps } from 'react-native-modal-datetime-picker';
import { useFormikContext } from 'formik';

import { Text } from '../General';

import { useTheme } from 'hooks';
import { layout } from 'constant';
import { Icon } from 'assets';

const { fonts, input } = layout;

interface FieldKeys {
  dob: Date;
  startDate: Date;
  endDate: Date;
  dateOfBirth: Date;
  departureDate: Date;
  returnDate: Date;
  arrivalDate: Date;
}

interface DatePickerProps extends Omit<DateTimePickerProps, 'onConfirm' | 'onCancel'> {
  name: keyof FieldKeys;
  label: string;
  titleColor?: string;
  marginBottom?: number;
  marginTop?: number;
  disabled?: boolean;
  initialDate?: Date;
}

export default function DatePicker({
  label,
  name,
  marginBottom = input.inputBottom,
  disabled,
  initialDate,
  ...props
}: DatePickerProps): JSX.Element | null {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [date, setDate] = useState(initialDate || new Date());
  const { color } = useTheme();

  const { setFieldTouched, setFieldValue, errors, touched, values } =
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
      <TouchableWithoutFeedback
        onPress={() => setOpen(!open)}
        onBlur={() => setFieldTouched(name)}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: error ? `${color.red}10` : color.input,
              borderColor: disabled
                ? color.border
                : error
                ? color.red
                : color.transparent,
            },
          ]}>
          <View style={styles.input}>
            {confirmed ? (
              <Text color={color.dark} size={fonts.subhead}>
                {values[name]?.toISOString().slice(0, 10)}
              </Text>
            ) : (
              <Text color={color.grey} size={fonts.subhead}>
                {label}
              </Text>
            )}
            <Icon name="chevron-down" color={color.grey} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: error ? 8 : marginBottom,
          marginTop: error ? 10 : 0,
        }}>
        {error && (
          <View
            style={{
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <Text textAlign="right" size={fonts.caption2} color={color.red}>
              {`${errors[name]}`}
            </Text>
          </View>
        )}
      </View>
      {open && (
        <Picker
          {...props}
          isVisible={open}
          timeZoneOffsetInMinutes={new Date().getTimezoneOffset()}
          mode="date"
          date={date}
          textColor={color.text}
          onChange={d => {
            if (d) {
              setDate(d);
              setFieldValue(name, d);
            }
          }}
          onConfirm={d => {
            setOpen(false);
            setConfirmed(true);
            setFieldValue(name, d);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: input.inputRadius,
    borderWidth: input.borderSize,
    flexDirection: 'row',
    minHeight: input.height,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  input: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    fontFamily: 'DMSansRegular',
    justifyContent: 'space-between',
  },
});
