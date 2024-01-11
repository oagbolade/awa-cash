//TODO: TBD
import { useRef } from 'react';

import { Container, Form, FormCamHandles, FormCamera, Header, Title } from 'components';
import { imageValidationSchema } from 'utils';

export default function CaptureDoc(): JSX.Element {
  const ref = useRef<FormCamHandles>(null);

  return (
    <>
      <Header />
      <Container>
        <Title title="Take a Picture of your Document" />
        <Form
          validationSchema={imageValidationSchema}
          initialValues={{
            image: undefined,
          }}
          onSubmit={value => {
            console.log('Image', `data:image/png;base64,${value.image}`);
          }}>
          <FormCamera
            previewIcon="camera"
            mode="back"
            ref={ref}
            name="image"
            isLoading={false}
          />
        </Form>
      </Container>
    </>
  );
}
