import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from '../General';

import { Icon } from 'assets';
import { layout, pallets } from 'constant';
import { useTheme } from 'hooks';

const { spacing } = layout;

type CardProps = {
  item: {
    icon?: IconName;
    color?: string;
    title: string;
  };
  onPress?: () => void;
  RightComponent?: React.ReactNode;
  disabled?: boolean;
};

export default function SectionCard({
  item,
  onPress,
  RightComponent,
  disabled,
}: CardProps): JSX.Element {
  const { color } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      {...{ disabled }}
      style={[styles.sectionCard, { backgroundColor: color.altBG }]}>
      <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row' }}>
        {item.icon && (
          <Icon
            name={item.icon}
            color={item.color}
            style={{ marginRight: 12 }}
            size={20}
          />
        )}
        <Text>{item.title}</Text>
      </View>
      {RightComponent || (
        <Icon name="chevron-right-outline" size={16} color={pallets.grey} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    alignItems: 'center',
    borderColor: pallets.border2,
    borderRadius: spacing.s,
    borderWidth: 0.2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.l,
    paddingHorizontal: spacing.padding,
    shadowColor: pallets.grey3,
    shadowOffset: {
      height: spacing.s,
      width: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: spacing.s,
  },
});
