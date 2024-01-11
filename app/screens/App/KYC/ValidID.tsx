import {
  Container,
  Divider,
  Form,
  FormDocPicker,
  FormPicker,
  Header,
  Submit,
  Title,
} from 'components';
import { KYCRoutes, StackNavigationProps } from 'navigation';
import { useService, useUploadDocumentsMutation } from 'service';
import { idValidationSchema } from 'utils';

export default function ValidID({
  navigation,
  route,
}: StackNavigationProps<KYCRoutes, 'ValidID'>): JSX.Element {
  const { params } = route;
  const [upload, { isError, isLoading, isSuccess, error }] = useUploadDocumentsMutation();

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      navigation.navigate('KYCSuccess', { message: 'Document uploaded successfully' });
    },
  });

  return (
    <>
      <Header />
      <Container>
        <>
          <Title title="Valid ID" subtitle="Select and upload a valid Id" />
          <Form
            validationSchema={idValidationSchema}
            initialValues={{
              id: '',
              type: undefined as unknown as PickerItemProps,
            }}
            onSubmit={values => {
              upload({
                idBase64: values.id,
                idNumber: '',
                idType: Number(values.type.value),
                utilityBase64: params.utilityBill,
              });
            }}>
            <FormPicker
              name="type"
              label="Valid ID"
              placeholder="Select valid ID"
              items={[
                {
                  label: 'National Identification Number',
                  value: '1',
                },
                {
                  label: "Driver's License",
                  value: '2',
                },
                {
                  label: 'Passport',
                  value: '3',
                },
                {
                  label: 'Voters Card',
                  value: '4',
                },
                {
                  label: 'Others',
                  value: '5',
                },
              ]}
            />
            <FormDocPicker
              label="Upload a valid ID"
              name="id"
              placeholder="Upload a valid ID"
              note={{
                description: 'File type accepted include: PDF, PNG, JPEG <100kb size',
              }}
            />
            <Divider />
            <Submit label="Continue" isLoading={isLoading} />
          </Form>
        </>
      </Container>
    </>
  );
}
