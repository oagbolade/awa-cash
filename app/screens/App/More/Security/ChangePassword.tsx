import { TextInput, View } from 'react-native';
import { useRef, useState } from 'react';

import { AltHeader, Container, Divider, Form, FormField, Submit } from 'components';
import { changePasswordValidationSchema } from 'utils';
import { MoreRoutes, StackNavigationProps } from 'navigation';
import { useChangePasswordMutation, useService } from 'service';

export default function ChangePassword({
  navigation,
}: StackNavigationProps<MoreRoutes, 'ChangePassword'>): JSX.Element {
  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const [showPass, setShowPass] = useState({
    confirmPassword: true,
    newPassword: true,
    oldPassword: true,
  });

  const [changePassword, { isError, isLoading, isSuccess, error, reset }] =
    useChangePasswordMutation();

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
      <AltHeader label="Change Password" />
      <Container>
        <Divider />
        <Form
          validationSchema={changePasswordValidationSchema}
          initialValues={{
            confirmNewPassword: '',
            newPassword: '',
            oldPassword: '',
          }}
          onSubmit={val => {
            changePassword(val);
          }}>
          <FormField
            secureTextEntry={showPass.oldPassword}
            label="Old Password"
            name="oldPassword"
            returnKeyLabel="Next"
            returnKeyType="next"
            onSubmitEditing={() => newPasswordRef.current?.focus()}
            rightIcon={showPass.oldPassword ? 'eye' : 'eye-slash'}
            onRightIconPress={() =>
              setShowPass(prev => ({ ...prev, oldPassword: !prev.oldPassword }))
            }
          />
          <FormField
            ref={newPasswordRef}
            secureTextEntry={showPass.newPassword}
            label="New Password"
            name="newPassword"
            returnKeyLabel="Next"
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            rightIcon={showPass.newPassword ? 'eye' : 'eye-slash'}
            onRightIconPress={() =>
              setShowPass(prev => ({ ...prev, newPassword: !prev.newPassword }))
            }
          />
          <FormField
            ref={confirmPasswordRef}
            secureTextEntry={showPass.confirmPassword}
            label="Confirm Password"
            name="confirmNewPassword"
            returnKeyLabel="Go"
            returnKeyType="go"
            rightIcon={showPass.confirmPassword ? 'eye' : 'eye-slash'}
            onRightIconPress={() =>
              setShowPass(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))
            }
          />
          <Divider />
          <Submit {...{ isLoading }} label="Submit" />
        </Form>
      </Container>
    </View>
  );
}
