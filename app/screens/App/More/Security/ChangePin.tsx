import { TextInput, View } from 'react-native';
import { useRef, useState } from 'react';

import { AltHeader, Container, Divider, Form, FormField, Submit, Text } from 'components';
import { changePinValidationSchema } from 'utils';
import { MoreRoutes, StackNavigationProps } from 'navigation';
import { useChangePinMutation, useService } from 'service';

export default function ChangePin({
  navigation,
}: StackNavigationProps<MoreRoutes, 'ChangePin'>): JSX.Element {
  const confirmPinRef = useRef<TextInput>(null);
  const newPinRef = useRef<TextInput>(null);
  const [showPin, setShowPin] = useState({
    confirmPin: true,
    newPin: true,
    oldPin: true,
  });

  const [changePin, { isError, isLoading, isSuccess, error, reset }] =
    useChangePinMutation();

  useService({
    error,
    errorEffect() {
      reset();
    },
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      navigation.navigate('MoreSuccess', { message: 'Pin change successful' });
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <AltHeader label="Change Transaction Pin" />
      <Container>
        <Text>
          Your 4-digit transaction PIN secures your transactions. it is important that you
          do not share this PIN with anyone.
        </Text>
        <Divider />
        <Form
          validationSchema={changePinValidationSchema}
          initialValues={{
            confirmNewPin: '',
            newPin: '',
            oldPin: '',
          }}
          onSubmit={val => {
            changePin(val);
          }}>
          <FormField
            maxLength={4}
            label="Current Pin"
            name="oldPin"
            keyboardType="number-pad"
            secureTextEntry={showPin.oldPin}
            returnKeyLabel="Next"
            returnKeyType="next"
            onSubmitEditing={() => newPinRef.current?.focus()}
            rightIcon={showPin.oldPin ? 'eye' : 'eye-slash'}
            onRightIconPress={() =>
              setShowPin(prev => ({ ...prev, oldPin: !prev.oldPin }))
            }
          />
          <FormField
            ref={newPinRef}
            maxLength={4}
            label="New Pin"
            name="newPin"
            keyboardType="number-pad"
            secureTextEntry={showPin.newPin}
            returnKeyLabel="Next"
            returnKeyType="next"
            onSubmitEditing={() => confirmPinRef.current?.focus()}
            rightIcon={showPin.newPin ? 'eye' : 'eye-slash'}
            onRightIconPress={() =>
              setShowPin(prev => ({ ...prev, newPin: !prev.newPin }))
            }
          />
          <FormField
            ref={confirmPinRef}
            maxLength={4}
            label="Confirm New Pin"
            name="confirmNewPin"
            keyboardType="number-pad"
            returnKeyLabel="Go"
            returnKeyType="go"
            secureTextEntry={showPin.confirmPin}
            rightIcon={showPin.confirmPin ? 'eye' : 'eye-slash'}
            onRightIconPress={() =>
              setShowPin(prev => ({ ...prev, confirmPin: !prev.confirmPin }))
            }
          />
          <Divider />
          <Submit {...{ isLoading }} label="Submit" />
        </Form>
        <View />
      </Container>
    </View>
  );
}
