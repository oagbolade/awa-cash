import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

import { Text } from '../General';
import { Divider } from '../Element';

import Container from './Container';
import Header from './Header';

import { useTheme } from 'hooks';
import { layout, pallets } from 'constant';

interface NumpadProps {
  pin?: number;
  onPinCompleted: (val: string) => void;
  resendCode?: () => void;
  resend?: boolean;
  secured?: boolean;
  fingerprint?: boolean;
  title: string;
  subtitle?: string;
  isLoading?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const { fonts, numpad, spacing } = layout;

const numbers = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 'fingerprint' },
  { id: 0 },
  { id: 'backspace' },
];

function Numpad({
  pin = 4,
  onPinCompleted,
  secured = true,
  fingerprint,
  title,
  subtitle,
  isLoading,
  error,
  errorMessage,
}: NumpadProps): JSX.Element | null {
  const code = Array.from({ length: pin }).fill('') as string[];

  const [input, setInput] = useState({ code });
  const { color } = useTheme();

  const onPressNum = (num: string) => {
    const temp = [...input.code];
    const emptyIndex = temp.indexOf('');
    if (emptyIndex !== -1) {
      temp[emptyIndex] = num;
      setInput({ code: temp });
      checkInput(temp);
    }
  };

  // const onPressNum = (num: string) => {
  //   const temp = [...input.code];
  //   const emptyIndex = temp.indexOf('');
  //   if (emptyIndex !== -1) {
  //     temp[emptyIndex] = num;
  //     setInput({ code: temp });
  //   }
  //   checkInput(temp);
  // };

  const onPressCancel = () => {
    const temp = [...input.code];
    const filledIndex = [...temp].reverse().findIndex(item => item !== '');

    if (filledIndex !== -1) {
      const originalIndex = temp.length - filledIndex - 1;
      temp[originalIndex] = '';
      setInput({ code: temp });
      checkInput(temp);
    }
  };

  // const onPressCancel = () => {
  //   const temp = [...input.code];
  //   const filledIndex = temp.findIndex(item => item !== '');

  //   if (filledIndex !== -1) {
  //     // Start from the last index and move towards the first index
  //     for (let i = temp.length - 1; i >= 0; i--) {
  //       if (temp[i] !== '') {
  //         temp[i] = '';
  //         break;
  //       }
  //     }
  //     setInput({ code: temp });
  //     checkInput(temp);
  //   }
  // };

  const checkInput = (temp: string[]) => {
    if (temp.at(-1) !== '') {
      const num = temp.join('');
      onPinCompleted(num);
    }
  };

  const FingerPrint = () => {
    if (fingerprint) {
      return <Icon name="finger-print-outline" size={20} color={pallets.primary} />;
    }

    return null;
  };

  return (
    <ImageBackground
      source={require('assets/images/app/pin-bg.png')}
      style={styles.container}>
      <Header transparent iconColor={pallets.white} />
      <Container backgroundColor={pallets.transparent}>
        <Text color={pallets.white} variant="bold-700" size={fonts.title2}>
          {title}
        </Text>
        <Divider space="t" />
        <Text color={pallets.white} size={fonts.subhead}>
          {subtitle}
        </Text>
        <Divider space="xl2" />
        {error && (
          <View style={styles.errorBox}>
            <Text variant="medium-500" color={pallets.errorYellow}>
              {errorMessage}
            </Text>
          </View>
        )}
        <View style={styles.codeContainer}>
          {input.code.map((key, index) => {
            return (
              <View key={index} style={{ height: 40 }}>
                <View style={[styles.code, { borderColor: color.grey }]}>
                  <Text variant="body" size={26}>
                    {secured && Boolean(key) ? '\u2022' : key}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <FlatList
          data={numbers}
          keyExtractor={item => item.id.toString()}
          // contentContainerStyle={[styles.inputContainer]}
          numColumns={3}
          bounces={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.input}
                disabled={item.id === 'fingerprint' && !fingerprint}
                onPress={() => {
                  if (item.id === 'backspace') {
                    onPressCancel();
                  } else if (item.id === 'fingerprint') {
                    console.log(item.id);
                  } else {
                    onPressNum(item.id.toString());
                  }
                }}>
                <View style={styles.inputBtn}>
                  {item.id === 'backspace' ? (
                    <Icon name="backspace-outline" size={20} color={pallets.primary} />
                  ) : item.id === 'fingerprint' ? (
                    <FingerPrint />
                  ) : (
                    <Text variant="reg-400" size={fonts.subhead} style={styles.number}>
                      {item.id}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </Container>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color={pallets.white} />
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  code: {
    alignItems: 'center',
    backgroundColor: pallets.neutral,
    borderRadius: 4,
    height: numpad.inputHeight,
    justifyContent: 'center',
    width: numpad.inputHeight,
  },
  codeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
    paddingHorizontal: spacing.padding,
  },
  container: {
    backgroundColor: pallets.primary,
    flex: 1,
  },
  errorBox: {
    alignItems: 'flex-end',
    marginBottom: spacing.s,
    paddingHorizontal: spacing.padding,
  },
  input: {
    alignItems: 'center',
    flex: 1,
    height: 80,
    justifyContent: 'center',
  },
  inputBtn: {
    alignItems: 'center',
    backgroundColor: pallets.white,
    borderRadius: numpad.btnHeight / 2,
    height: numpad.btnHeight,
    justifyContent: 'center',
    width: numpad.btnHeight,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: `${pallets.black}99`,
    height: undefined,
    justifyContent: 'center',
    width: undefined,
  },
  number: {
    textAlign: 'center',
  },
});

export default Numpad;
