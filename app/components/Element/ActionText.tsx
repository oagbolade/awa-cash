import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '../General';

import { pallets } from 'constant';

interface ActionTextProps {
  onPress?: () => void;
  question: string;
  action: string;
}

export default function ActionText({
  action,
  question,
  onPress,
}: ActionTextProps): JSX.Element | null {
  return (
    <TouchableOpacity activeOpacity={0.7} {...{ onPress }} style={styles.container}>
      <Text>
        {question} <Text color={pallets.primary}>{action}</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
});
