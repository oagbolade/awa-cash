import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

import { Title } from '../Element';
import { Text } from '../General';

import Container from './Container';

import { pallets } from 'constant';

interface SecureNumpadProps {
  pinLimit?: number;
  onPinCompleted: (pin: string) => void;
  isLoading?: boolean;
  title: string;
  subtitle?: string;
}

export default function SecureNumpad({
  pinLimit = 4,
  onPinCompleted,
  title,
  subtitle,
}: SecureNumpadProps): JSX.Element {
  const [pin, setPin] = useState<string>('');

  const onNumberPress = (number: number) => {
    if (pin.length < pinLimit) {
      setPin(pin + number);
      if (pin.length + 1 === pinLimit) {
        const newPin = pin + number;
        console.log(newPin);
        onPinCompleted(newPin);
      }
    }
  };

  const onDeletePress = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <Container
      header
      headerOptions={{
        color: pallets.primary,
        iconColor: pallets.white,
      }}
      backgroundColor={pallets.primary}>
      <Title color={pallets.white} title={title} subtitle={subtitle} />
      <View style={styles.pinContainer}>
        {Array.from({ length: pinLimit }, (_, i) => (
          <TextInput
            key={i}
            style={styles.pinInput}
            maxLength={1}
            secureTextEntry
            editable={false}
            // placeholder=""
            placeholderTextColor={'#0000008A'}
            value={pin[i] || ''}
          />
        ))}
      </View>
      <View style={styles.footer}>
        <View style={styles.numpadContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
            <View style={styles.numberButton} key={number}>
              <TouchableOpacity
                onPress={() => onNumberPress(number)}
                style={styles.numberBox}>
                <Text>{number}</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.numberButton} />
          <View style={styles.numberButton}>
            <TouchableOpacity style={styles.numberBox} onPress={() => onNumberPress(0)}>
              <Text>0</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.numberButton}>
            <TouchableOpacity style={styles.numberBox} onPress={onDeletePress}>
              <Icon name="backspace-outline" size={24} color={pallets.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',
  },
  numberBox: {
    alignItems: 'center',
    backgroundColor: pallets.white,
    borderRadius: 40,
    height: 65,
    justifyContent: 'center',
    width: 65,
  },
  numberButton: {
    alignItems: 'center',
    borderRadius: 500,
    height: 70,
    justifyContent: 'center',
    marginVertical: 10,
    width: '30%',
  },
  numpadContainer: {
    alignItems: 'center',
    // borderWidth: 1,
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // width: '90%',
  },
  pinContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 34,
    width: '100%',
  },
  pinInput: {
    backgroundColor: pallets.white,
    borderRadius: 4,
    height: 58,
    marginHorizontal: 5,
    textAlign: 'center',
    width: 58,
  },
});
