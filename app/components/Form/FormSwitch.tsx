import { useFormikContext } from 'formik';
import { StyleSheet, View } from 'react-native';

import { Text } from '../General';

import { layout } from 'constant';
import { Switch } from 'components/Element';

const { subhead } = layout.fonts;

interface CheckFieldKeys {
  save: boolean;
}

interface Props {
  name: keyof CheckFieldKeys;
  label: string;
}

export default function FormSwitch({ label, name }: Props): JSX.Element | null {
  const { setFieldValue, values } = useFormikContext<CheckFieldKeys>();

  return (
    <View style={[styles.container, { justifyContent: 'flex-end' }]}>
      <Text textTransform="capitalize" size={subhead}>
        {label}
      </Text>
      <Switch
        enabled={values[name]}
        onValueChange={() => setFieldValue(name, !values[name])}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
