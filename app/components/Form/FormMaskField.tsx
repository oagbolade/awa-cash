import { forwardRef } from 'react';
import { useFormikContext } from 'formik';
import { TextInput } from 'react-native';

import FormMaskInput, { FormMaskInputProps } from './FormMaskInput';

export interface FieldKeys {
  accountNumber: string;
  address: string;
  brand: string;
  bvn: string;
  car: string;
  confirmPassword: string;
  confirmNewPassword: string;
  confirmPin: string;
  confirmNewPin: string;
  currentPassword: string;
  currentPin: string;
  date: string;
  email: string;
  firstName: string;
  issue: string;
  lastName: string;
  lga: string;
  location: string;
  locations: string;
  middleName: string;
  model: string;
  name: string;
  newPassword: string;
  newPin: string;
  oldPassword: string;
  oldPin: string;
  otherName: string;
  password: string;
  performance: string;
  phoneNumber: string;
  comment: string;
  transactionDate: string;
  customerId: string;
  city: string;
  utilityBill: string;
  country: string;
  id: string;
  idType: string;
  amount: string;
}

interface FormMaskFieldProps extends FormMaskInputProps {
  name: keyof FieldKeys;
  label: string;
  labelColor?: string;
  icon?: IconName;
  onTextChange?: (text: string) => void;
  symbol?: string;
  disabled?: boolean;
  marginBottom?: number;
  note?: string;
  noteVisible?: boolean;
  isLoading?: boolean;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
}

const FormMaskField = forwardRef<TextInput, FormMaskFieldProps>(
  (
    {
      icon,
      name,
      label,
      labelColor,
      symbol,
      isLoading,
      onTextChange,
      disabled,
      rightIcon,
      onRightIconPress,
      note,
      noteVisible,
      marginBottom,
      ...props
    }: FormMaskFieldProps,
    ref,
  ): JSX.Element | null => {
    const { setFieldTouched, setFieldValue, errors, touched, handleSubmit, values } =
      useFormikContext<FieldKeys>();

    const error = !!(errors[name] && touched[name]);
    // const error = Boolean(errors[name]);

    return (
      <>
        <FormMaskInput
          onChangeText={(_, text) => {
            setFieldValue(name, text);
            onTextChange?.(text);
          }}
          onBlur={() => {
            setFieldTouched(name);
          }}
          onSubmitEditing={() => handleSubmit()}
          errorMessage={errors[name]}
          {...{ note, noteVisible }}
          value={values[name]}
          {...{
            disabled,
            error,
            icon,
            isLoading,
            label,
            labelColor,
            marginBottom,
            onRightIconPress,
            ref,
            rightIcon,
            symbol,
          }}
          {...props}
        />
      </>
    );
  },
);

export default FormMaskField;
