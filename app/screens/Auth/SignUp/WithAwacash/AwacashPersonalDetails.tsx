import { StyleSheet, TextInput, View } from 'react-native';
import { useRef } from 'react';

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
import { Logo } from 'assets';
import { AuthRoutes, StackNavigationProps } from 'navigation';
import { personalDetailsValidationSchema } from 'utils';

export default function AwacashPersonalDetails({
  navigation,
  route,
}: StackNavigationProps<AuthRoutes, 'AwacashPersonalDetails'>): JSX.Element {
  const { params } = route;
  console.log('🚀 ~ file: AwacashPersonalDetails.tsx:23 ~ params:', params);

  const middleNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);

  return (
    <>
      <Header />
      <Container>
        <VirtualScroll>
          <Logo name="logo" size="40%" style={{ alignSelf: 'center' }} />
          <Divider />
          <Title title="Personal Details" />
          <Form
            validationSchema={personalDetailsValidationSchema}
            initialValues={{
              firstName: params.firstName,
              lastName: params.lastName,
              middleName: '',
            }}
            onSubmit={val => {
              navigation.navigate('AwacashCreatePin', {
                ...params,
                ...val,
              });
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
            <Divider space="xl" />
            <Submit label="Next" />
            <Divider space="s" />
          </Form>
          <View style={styles.container}>
            <View />
          </View>
        </VirtualScroll>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
