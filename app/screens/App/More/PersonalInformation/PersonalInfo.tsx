import { Alert, FlatList, TextInput } from 'react-native';
import { useRef } from 'react';
import * as Clipboard from 'expo-clipboard';

import { Avatar, SectionCard } from '../Components';
import { personalInfoData } from '../Data';

import {
  BottomSheet,
  BottomSheetHandle,
  Button,
  Container,
  Divider,
  Form,
  FormField,
  Header,
  VirtualScroll,
} from 'components';
import { pallets } from 'constant';
import { useSelector } from 'store';

const copyToClipboard = async () => {
  await Clipboard.setStringAsync('insert bvn string');
  Alert.alert('', 'Bvn copied to clipboard.');
};

export default function PersonalInfo(): JSX.Element {
  const bvnRef = useRef<TextInput>(null);
  const bottomSheetRef = useRef<BottomSheetHandle>(null);
  const { user } = useSelector(state => state.auth);

  return (
    <>
      <Header
        label="Personal Details"
        color={pallets.primary}
        iconColor={pallets.white}
      />
      <>
        <VirtualScroll bounces={false}>
          <Container>
            <Avatar level="1" />
            <Form
              validationSchema={null}
              initialValues={{
                dateOfBirth: user?.createdDate,
                emailAddress: user?.email,
                firstName: user?.firstName,
                lastName: user?.lastName,
                otherName: user?.middleName,
                phoneNumber: user?.phoneNumber,
                residentialAddress: user?.address,
              }}
              onSubmit={() => {
                console.log('submited personal info');
              }}>
              <FormField
                autoCorrect={false}
                name="firstName"
                editable={false}
                label="First Name"
                icon="profile-circle"
                returnKeyLabel="Next"
                returnKeyType="next"
              />
              <FormField
                autoCorrect={false}
                name="lastName"
                editable={false}
                label="Last Name"
                icon="profile-circle"
                returnKeyLabel="Next"
                returnKeyType="next"
              />
              <FormField
                autoCorrect={false}
                name="otherName"
                editable={false}
                label="Other Name"
                icon="profile-circle"
                returnKeyLabel="Go"
                returnKeyType="go"
              />
              <FormField
                autoCorrect={false}
                name="email"
                editable={false}
                label="Email Address"
                icon="profile-circle"
                returnKeyLabel="Go"
                returnKeyType="go"
              />
              <FormField
                autoCorrect={false}
                name="phoneNumber"
                editable={false}
                label="Phone Number"
                icon="profile-circle"
                returnKeyLabel="Go"
                returnKeyType="go"
              />
              <FormField
                autoCorrect={false}
                name="date"
                editable={false}
                label="Date of Birth"
                icon="profile-circle"
                returnKeyLabel="Go"
                returnKeyType="go"
              />
              <FormField
                autoCorrect={false}
                name="address"
                editable={false}
                label="Residential Address"
                icon="profile-circle"
                returnKeyLabel="Go"
                returnKeyType="go"
              />
              <FormField
                autoCorrect={false}
                name="details"
                editable={false}
                label="Nationality"
                icon="profile-circle"
                returnKeyLabel="Go"
                returnKeyType="go"
              />
              <FormField
                autoCorrect={false}
                name="country"
                editable={false}
                label="Country"
                icon="profile-circle"
                returnKeyLabel="Go"
                returnKeyType="go"
              />
              <FormField
                autoCorrect={false}
                ref={bvnRef}
                name="bvn"
                editable={false}
                label="BVN"
                icon="profile-circle"
                returnKeyLabel="Go"
                returnKeyType="go"
                rightIcon="copy"
                onRightIconPress={copyToClipboard}
              />
              <Divider />
            </Form>
            <BottomSheet ref={bottomSheetRef}>
              <FlatList
                ListHeaderComponent={() => <Divider space="s" />}
                data={personalInfoData}
                ItemSeparatorComponent={() => <Divider space="s" />}
                renderItem={({ item }) => (
                  <>
                    <SectionCard
                      item={{ title: item.value.toString() }}
                      onPress={() => {
                        bottomSheetRef.current?.close();
                      }}
                    />
                  </>
                )}
                ListFooterComponent={() => (
                  <>
                    <Divider space="xxl" />
                    <Button
                      label="Cancel"
                      onPress={() => bottomSheetRef.current?.close()}
                    />
                  </>
                )}
              />
            </BottomSheet>

            <Divider space="xl" />

            <Divider space="xl" />
          </Container>
        </VirtualScroll>
      </>
    </>
  );
}
