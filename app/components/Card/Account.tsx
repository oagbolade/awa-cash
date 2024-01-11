import { Image, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

import { Text } from '../General';
import { Divider } from '../Element';

import { layout, pallets } from 'constant';
import { formatCurrency } from 'utils';

const { fonts } = layout;

interface Props {
  name: string;
  accountNumber: string;
  balance: string;
  bookBalance: string;
  width?: number;
  marginRight?: number;
  backgroundColor?: string;
  variant?: 'small';
  onPress?: () => void;
}

export default function Account({
  accountNumber,
  balance,
  name,
  width,
  marginRight,
  bookBalance,
  backgroundColor,
  variant,
  onPress,
}: Props): JSX.Element | null {
  const [enabled, setEnabled] = useState(false);

  if (variant === 'small') {
    return (
      <TouchableOpacity
        {...{ onPress }}
        activeOpacity={0.75}
        style={[
          styles.container,
          { backgroundColor: backgroundColor || pallets.primary, marginRight, width },
        ]}>
        <Text variant="bold-700" size={fonts.callout} color={pallets.white}>
          {name} - {accountNumber}
        </Text>
        <Divider space="l" />
        <Text size={14} color={pallets.white}>
          Available Balance
        </Text>
        <Text variant="bold-700" size={28} color={pallets.white}>
          {enabled ? '₦******' : formatCurrency(balance)}
        </Text>
        <Divider space="m" />
        <View style={styles.switchRow}>
          <Text size={fonts.caption1} color={pallets.white}>
            {enabled ? 'Show' : 'Hide'} available balance
          </Text>
          <Switch
            trackColor={{
              false: pallets.grey,
              true: `${pallets.primary}99`,
            }}
            thumbColor={enabled ? pallets.white : pallets.darkGrey}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setEnabled(prev => !prev);
            }}
            value={enabled}
            style={{ transform: [{ scale: 0.65 }] }}
          />
        </View>
        <Image
          source={require('../../assets/images/app/card_bg.png')}
          style={styles.imageBg}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor || pallets.primary, marginRight, width },
      ]}>
      <Text
        variant="bold-700"
        color={pallets.white}
        size={fonts.subhead}
        numberOfLines={1}>
        {name} - {accountNumber}
      </Text>
      <Divider space="l" />
      <Text size={14} color={pallets.white}>
        Available Balance
      </Text>
      <Text variant="bold-700" size={28} color={pallets.white}>
        {enabled ? '₦******' : formatCurrency(balance)}
      </Text>
      <Text size={14} color={pallets.white}>
        Book balance: {enabled ? '₦******' : formatCurrency(bookBalance)}
      </Text>
      <Divider space="m" />
      <View style={styles.switchRow}>
        <Text size={fonts.caption1} color={pallets.white}>
          {enabled ? 'Show' : 'Hide'} available balance
        </Text>
        <Switch
          trackColor={{
            false: pallets.grey,
            true: `${pallets.primary}99`,
          }}
          thumbColor={enabled ? pallets.white : pallets.darkGrey}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            setEnabled(prev => !prev);
          }}
          value={enabled}
          style={{ transform: [{ scale: 0.65 }] }}
        />
      </View>
      <Image
        source={require('../../assets/images/app/card_bg.png')}
        style={styles.imageBg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 16,
  },
  imageBg: {
    ...StyleSheet.absoluteFillObject,
    height: undefined,
    width: undefined,
    zIndex: -10,
  },
  switchRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
