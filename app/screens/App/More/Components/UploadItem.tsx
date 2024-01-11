import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import UploadBar from './UploadBar';

import { Text } from 'components';
import { Icon } from 'assets'; // Import your icon library here
import { layout, pallets } from 'constant';

const { fonts, spacing } = layout;

interface UploadItemProps {
  onCancel: () => void;
  percent: number;
  name: string;
}

export default function UploadItem({
  onCancel,
  percent = 0,
  name = 'Uploading...',
}: UploadItemProps): JSX.Element {
  return (
    <View style={styles.container}>
      <AntDesign
        name="paperclip"
        size={spacing.m}
        color={pallets.black}
        style={styles.icon}
      />
      <View>
        <View style={styles.row}>
          <Text
            textAlign="left"
            color={pallets.text2}
            size={fonts.subhead}
            lineHeight={fonts.title2}>
            {name}
          </Text>
          <TouchableOpacity onPress={onCancel} style={styles.cancelIcon}>
            <Icon name="close" size={spacing.r} color={pallets.grey2} />
          </TouchableOpacity>
        </View>
        <UploadBar percent={percent} barWidth={spacing.xxl2 * 2} barHeight={5} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cancelIcon: {
    marginLeft: spacing.s,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    padding: spacing.xs,
  },
  icon: {
    marginRight: spacing.s,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
});
