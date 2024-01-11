import { useRef } from 'react';
import { TextInput } from 'react-native';

import {
  Container,
  Divider,
  Form,
  FormField,
  Header,
  Submit,
  Title,
  VirtualScroll,
} from 'components';
import { AuthRoutes, StackNavigationProps } from 'navigation';
import { personalDetailsValidationSchema } from 'utils';

export default function PersonalDetails({
  navigation,
  route,
}: StackNavigationProps<AuthRoutes, 'PersonalDetails'>): JSX.Element {
  const { params } = route;
  const middleNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);

  return (
    <>
      <Header />
      <VirtualScroll>
        <Container>
          <Title
            title="Personal Detail"
            subtitle="Please, add your name as it appears on your official documents"
          />
          <Form
            validationSchema={personalDetailsValidationSchema}
            initialValues={{
              firstName: '',
              lastName: '',
              middleName: '',
            }}
            onSubmit={values => {
              navigation.navigate('CreatePin', { ...params, ...values });
            }}>
            <FormField
              autoCorrect={false}
              name="firstName"
              label="First Name"
              icon="profile-circle"
              returnKeyLabel="Next"
              returnKeyType="next"
              onSubmitEditing={() => lastNameRef.current?.focus()}
            />
            <FormField
              autoCorrect={false}
              ref={lastNameRef}
              name="lastName"
              label="Last Name"
              icon="profile-circle"
              returnKeyLabel="Next"
              returnKeyType="next"
              onSubmitEditing={() => middleNameRef.current?.focus()}
            />
            <FormField
              autoCorrect={false}
              ref={middleNameRef}
              name="middleName"
              label="Middle Name"
              icon="profile-circle"
              returnKeyLabel="Go"
              returnKeyType="go"
            />
            <Divider space="xxl" />
            <Submit label="Continue" />
            <Divider />
          </Form>
        </Container>
      </VirtualScroll>
    </>
  );
}
