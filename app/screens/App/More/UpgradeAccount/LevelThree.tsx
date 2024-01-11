import { useRef } from 'react';
import { TextInput } from 'react-native';

import {
  Container,
  Divider,
  Form,
  FormField,
  Header,
  Submit,
  Text,
  VirtualScroll,
} from 'components';
import { layout, pallets } from 'constant';
import { personalInformationValidationSchema } from 'utils';
import { useService, useUpgradeAccountMutation } from 'service';
import { MoreRoutes, StackNavigationProps } from 'navigation';

const { fonts } = layout;

export default function LevelThree({
  navigation,
}: StackNavigationProps<MoreRoutes, 'LevelThree'>): JSX.Element {
  const cityRef = useRef<TextInput>(null);
  const countryRef = useRef<TextInput>(null);
  const [upgrade, { isError, isLoading, isSuccess, error }] = useUpgradeAccountMutation();

  useService({
    error,
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      navigation.navigate('MoreSuccess', { message: 'Upgrade Successful' });
    },
  });

  return (
    <>
      <Header label="Upgrade Account" color={pallets.primary} iconColor={pallets.white} />
      <>
        <VirtualScroll bounces={false}>
          <Container>
            <Form
              validationSchema={personalInformationValidationSchema}
              initialValues={{
                currentAddress: '',
                currentCity: '',
                currentCountry: '',
                nextOfKinAddress: '',
                nextOfKinEmailAddress: '',
                nextOfKinName: '',
                nextOfKinPhoneNumber: '',
                relationshipWithNextOfKin: '',
                state: '',
              }}
              onSubmit={val => {
                console.log('Submitted personal info');
                upgrade({
                  address: val.currentAddress,
                  city: val.currentCity,
                  country: val.currentCountry,
                  nextOfKinAddress: val.nextOfKinAddress,
                  nextOfKinEmail: val.nextOfKinEmailAddress,
                  nextOfKinName: val.nextOfKinName,
                  nextOfKinPhoneNumber: val.nextOfKinPhoneNumber,
                  nextOfKinRelationship: val.relationshipWithNextOfKin,
                  state: val.state,
                });
              }}>
              <Divider />
              <Text
                textAlign="left"
                variant="body"
                color={pallets.text2}
                size={fonts.subhead}>
                Kindly provide the following details to upgrade to level 3
              </Text>
              <Divider />
              <Text
                textAlign="left"
                variant="title"
                color={pallets.black}
                size={fonts.caption2}>
                Current Personal Address
              </Text>
              <Divider space="s" />
              <FormField
                autoCorrect={false}
                name="currentAddress"
                onSubmitEditing={() => cityRef.current?.focus()}
                label="Address"
                returnKeyLabel="Next"
                returnKeyType="next"
              />
              <FormField
                ref={cityRef}
                autoCorrect={false}
                name="currentCity"
                onSubmitEditing={() => countryRef.current?.focus()}
                label="City"
                returnKeyLabel="Next"
                returnKeyType="next"
              />
              <FormField
                autoCorrect={false}
                name="state"
                label="State"
                returnKeyLabel="Go"
                returnKeyType="go"
              />
              <FormField
                ref={countryRef}
                autoCorrect={false}
                name="currentCountry"
                label="Country"
                returnKeyLabel="Go"
                returnKeyType="go"
              />
              <Divider />
              <Text
                textAlign="left"
                variant="title"
                color={pallets.black}
                size={fonts.caption2}>
                Next of Kin's Information
              </Text>
              <Divider space="s" />
              <FormField
                autoCorrect={false}
                name="nextOfKinName"
                label="Name"
                returnKeyLabel="Go"
                returnKeyType="go"
              />
              <FormField
                autoCorrect={false}
                name="relationshipWithNextOfKin"
                label="Relationship"
                returnKeyLabel="Go"
                returnKeyType="go"
              />
              <FormField
                autoCorrect={false}
                name="nextOfKinPhoneNumber"
                label="Phone Number"
                returnKeyLabel="Go"
                returnKeyType="go"
              />
              <FormField
                autoCorrect={false}
                name="nextOfKinEmailAddress"
                label="Email Address"
                keyboardType="email-address"
                returnKeyLabel="Go"
                returnKeyType="go"
              />
              <FormField
                autoCorrect={false}
                name="nextOfKinAddress"
                label="Address"
                returnKeyLabel="Go"
                returnKeyType="go"
              />
              <Divider space="xxl" />
              <Submit {...{ isLoading }} label="Submit" />
              <Divider space="xxl" />
            </Form>
          </Container>
        </VirtualScroll>
      </>
    </>
  );
}
