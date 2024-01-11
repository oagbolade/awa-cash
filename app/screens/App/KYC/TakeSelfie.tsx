import { useRef } from 'react';

import { Container, Form, FormCamHandles, FormCamera, Header, Title } from 'components';
import { KYCRoutes, StackNavigationProps } from 'navigation';
import { imageValidationSchema } from 'utils';
import { useService, useUploadProfileImageMutation } from 'service';

export default function TakeSelfie({
  navigation,
}: StackNavigationProps<KYCRoutes, 'TakeSelfie'>): JSX.Element {
  const ref = useRef<FormCamHandles>(null);
  const [upload, { isError, isLoading, isSuccess, error }] =
    useUploadProfileImageMutation();

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      navigation.navigate('KYCSuccess', { message: 'Image uploaded successfully' });
    },
  });

  return (
    <>
      <Header />
      <Container>
        <Title title="Take a Selfie" />
        <Form
          validationSchema={imageValidationSchema}
          initialValues={{
            image: undefined,
          }}
          onSubmit={value => {
            console.log('Image', `data:image/png;base64,${value.image}`);
            upload({
              profileBase64: `${value.image}`,
            });
          }}>
          <FormCamera ref={ref} name="image" {...{ isLoading }} />
        </Form>
      </Container>
    </>
  );
}
