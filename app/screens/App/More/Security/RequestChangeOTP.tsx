import { StyleSheet, View } from 'react-native';

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
import { emailValidationSchema } from 'utils';
import { AppRoutes, MoreRoutes, RootNavigationProp } from 'navigation';

export default function RequestChangeOTP({
  navigation,
  route,
}: RootNavigationProp<AppRoutes, MoreRoutes, 'RequestChangeOTP'>): JSX.Element {
  const { params } = route;
  return (
    <>
      <Header />
      <VirtualScroll>
        <Container>
          <Title
            title={params.operationType}
            subtitle="Please enter your registered email address."
          />
          <Form
            validationSchema={emailValidationSchema}
            initialValues={{ email: '' }}
            onSubmit={() => {
              console.log('email validate form');
              navigation.navigate('ValidateChangeOTP');
            }}>
            <FormField name="email" label="Email" />
            <Divider space="xl" />
            <Submit label="Continue" />
          </Form>
          <View style={styles.container} />
        </Container>
      </VirtualScroll>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
