import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

import { useTheme } from 'hooks';

interface Props extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  marginBottom?: number;
}

export default function SearchInput({
  onChangeText,
  value,
  marginBottom,
  ...props
}: Props): JSX.Element | null {
  const { color } = useTheme();

  return (
    <View style={[styles.search, { backgroundColor: color.input, marginBottom }]}>
      <Icon name="ios-search-outline" color={color.black} size={18} />
      <TextInput
        style={[styles.input, { color: color.black }]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search"
        placeholderTextColor={color.grey}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'DMSansRegular',
    height: '100%',
    paddingHorizontal: 8,
    width: '100%',
  },
  search: {
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    height: 48,
    paddingHorizontal: 8,
  },
});
