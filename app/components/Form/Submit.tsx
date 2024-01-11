import { useFormikContext } from 'formik';

type disabledProps = 'dirty' | 'isValid' | 'dirty & isValid';

import Button, { ButtonProps } from '../Element/Button';

interface SubmitProps extends ButtonProps {
  validation?: disabledProps;
  onPress?: () => void;
}

export default function Submit({
  label,
  validation,
  variant,
  onPress,
  ...props
}: SubmitProps): JSX.Element | null {
  const { handleSubmit, isValid, dirty } = useFormikContext();

  const validateBtn = () => {
    switch (validation) {
      case 'isValid': {
        return !isValid;
      }
      case 'dirty': {
        return !dirty;
      }
      case 'dirty & isValid': {
        return !(dirty && isValid);
      }
      default: {
        return false;
      }
    }
  };

  return (
    <Button
      {...{ label }}
      variant={variant}
      onPress={() => {
        handleSubmit();
        onPress?.();
      }}
      disabled={validateBtn()}
      {...props}
    />
  );
}
