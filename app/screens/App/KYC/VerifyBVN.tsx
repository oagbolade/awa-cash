import { useState } from 'react';

import {
  ActionText,
  Container,
  Divider,
  Form,
  FormDatePicker,
  FormField,
  Header,
  Submit,
  Title,
} from 'components';
import { KYCRoutes, StackNavigationProps } from 'navigation';
import { useInitializeBVNMutation, useService } from 'service';
import { verifyBVNValidationSchema } from 'utils';
import { useSelector } from 'store';

export default function VerifyBVN({
  navigation,
}: StackNavigationProps<KYCRoutes, 'VerifyBVN'>): JSX.Element {
  const [value, setValue] = useState({
    dateOfBirth: undefined as unknown as Date,
  });
  const [generate, { isError, isLoading, isSuccess, data, error, reset }] =
    useInitializeBVNMutation();
  const { user } = useSelector(state => state.auth);

  useService({
    error,
    errorEffect() {
      reset();
    },
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      navigation.navigate('VerifyBVNWeb', {
        dateOfBirth: value.dateOfBirth.getTime(),
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        uri: data?.data || '',
      });
    },
  });

  return (
    <>
      <Header />
      <Container>
        <Title title="Verify BVN" subtitle="Please fill this form to verify your BVN." />
        <Form
          validationSchema={verifyBVNValidationSchema}
          initialValues={{
            bvn: '',
            dateOfBirth: undefined as unknown as Date,
          }}
          onSubmit={values => {
            setValue(values);
            generate({ bvn: values.bvn });
          }}>
          <FormField label="BVN" name="bvn" placeholder="Enter BVN" />
          <FormDatePicker
            label="Date of Birth"
            name="dateOfBirth"
            maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
          />
          <Divider />
          <Submit label="Verify" isLoading={isLoading} />
          <Divider />
          <ActionText action="Contact support" question="Unable to validate BVN?" />
        </Form>
      </Container>
    </>
  );
}
