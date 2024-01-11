import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import RNWebView from 'react-native-webview';
import { useRef, useState } from 'react';

import { useHeaderHeight } from 'hooks';
import { pallets } from 'constant';
import { Text } from 'components';
import { Icon } from 'assets';
import { KYCRoutes, StackNavigationProps } from 'navigation';
import { useGetProfileQuery, useService, useValidateBVNMutation } from 'service';

const matchURL = (url: string) => {
  const match = url.match(/\?code=([^&]*)&/);

  return match ? match[1] : undefined;
};

export default function VerifyWeb({
  navigation,
  route,
}: StackNavigationProps<KYCRoutes, 'VerifyBVNWeb'>): JSX.Element {
  const profileQuery = useGetProfileQuery();
  const [validate, { isError, isLoading, isSuccess, error, reset }] =
    useValidateBVNMutation();
  const [current, setCurrent] = useState(true);
  const { uri, dateOfBirth, firstName, lastName } = route.params;
  const { insets, headerHeight } = useHeaderHeight();
  const ref = useRef<RNWebView>(null);

  useService({
    error,
    errorEffect() {
      reset();
    },
    isError,
    isLoading,
    isSuccess,
    successEffect() {
      navigation.navigate('KYCSuccess', { message: 'BVN Verified successfully' });
    },
  });

  useService({
    error: profileQuery.error,
    isError: profileQuery.isError,
    isLoading: profileQuery.isLoading,
    isSuccess: profileQuery.isSuccess,
  });

  if (isLoading || profileQuery.isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={pallets.primary} />
      </View>
    );
  }

  return (
    <>
      <View
        style={[
          styles.container,
          {
            height: headerHeight,
            paddingTop: insets.top,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            ref.current?.goBack();
            navigation.goBack();
          }}>
          <Icon name="chevron-left" style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <Text>Verify BVN</Text>
      </View>
      <RNWebView
        cacheEnabled={false}
        cacheMode={'LOAD_NO_CACHE'}
        incognito={true}
        source={{
          uri,
        }}
        onNavigationStateChange={event => {
          if (/app.*\?code=/.test(event.url) && current) {
            const accessToken = matchURL(event.url);

            if (accessToken) {
              validate({
                accessToken,
                dateOfBirth: new Date(dateOfBirth).toISOString(),
                firstName,
                lastName,
              });
            } else {
              ref.current?.goBack();
              setCurrent(false);

              Alert.alert('Verification Error', 'Something went wrong', [
                {
                  onPress: () => {
                    navigation.goBack();
                  },
                  text: 'Go Back',
                },
              ]);
            }
          }
        }}
        {...{ ref }}
        style={{ paddingTop: 40 }}
        bounces={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: pallets.white,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  loader: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

// const urlParams = new URLSearchParams(window.location.search);
// const myParam = urlParams.get('myParam');
