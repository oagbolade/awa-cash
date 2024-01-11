import { StyleSheet, TouchableOpacity } from 'react-native';
import { useFormikContext } from 'formik';

import { Text } from '../General';

import { Icon } from 'assets';
import { layout, pallets } from 'constant';

const { subhead } = layout.fonts;

interface CheckFieldKeys {
  remember: boolean;
}

interface Props {
  name: keyof CheckFieldKeys;
  label: string;
}

export default function FormCheck({ label, name }: Props): JSX.Element | null {
  const { setFieldTouched, setFieldValue, values, errors } =
    useFormikContext<CheckFieldKeys>();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onBlur={() => setFieldTouched(name)}
      onPress={() => setFieldValue(name, !values[name])}>
      <Icon
        size={20}
        name={values[name] ? 'box-tick' : 'box'}
        style={{ marginRight: 10 }}
        color={errors[name] ? pallets.red : pallets.primary}
      />
      <Text textTransform="capitalize" size={subhead} variant="body">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
