import { StyleSheet, View } from 'react-native';

import { pallets } from 'constant';

interface SeparatorProps {
  width?: `${number}%`;
  color?: string;
}

function Separator({ width = '90%', color }: SeparatorProps): JSX.Element | null {
  return (
    <View
      style={[
        styles.separator,
        {
          backgroundColor: color || pallets.grey,
          width,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    alignSelf: 'center',
    height: 1,
  },
});

export default Separator;
