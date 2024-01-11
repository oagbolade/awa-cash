import { StyleSheet, View } from 'react-native';

import { Text } from '../General';

import { pallets } from 'constant';

interface Props {
  title: string;
  marginTop?: number;
  marginBottom?: number;
}

export default function TagTitle({
  title,
  marginBottom = 20,
  marginTop = 20,
}: Props): JSX.Element | null {
  return (
    <View style={[styles.container, { marginBottom, marginTop }]}>
      <Text color={pallets.primary}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: pallets.lightBlue,
    borderRadius: 40,
    flex: 1,
    padding: 8,
    paddingHorizontal: 16,
  },
});
