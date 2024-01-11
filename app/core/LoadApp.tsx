import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';

import { pallets } from 'constant';
import { AppNavigator, AuthNavigator, OnboardNavigator } from 'navigation';
import { useSelector } from 'store';

const theme: Theme = {
  colors: {
    background: pallets.white,
    border: pallets.border,
    card: pallets.card,
    notification: pallets.notification,
    primary: pallets.primary,
    text: pallets.text,
  },
  dark: false,
};

const fonts = {
  DMSansBold: require('../assets/fonts/DMSans-Bold.ttf'),
  DMSansMedium: require('../assets/fonts/DMSans-Medium.ttf'),
  DMSansRegular: require('../assets/fonts/DMSans-Regular.ttf'),
};

SplashScreen.preventAutoHideAsync();

export default function LoadApp(): JSX.Element | null {
  const { isAuthenticated } = useSelector(state => state.auth);
  const { onboarded } = useSelector(state => state.persisted);
  const [fontsLoaded] = useFonts(fonts);

  const releaseChannel = Updates.releaseChannel ?? null;

  if (releaseChannel === 'development') {
    Alert.alert('', 'Testing...');
  }

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 800);

      Updates.checkForUpdateAsync()
        .then(async update => {
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          }
        })
        .catch(() => null);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer {...{ theme }}>
          <SafeAreaProvider>
            {isAuthenticated ? (
              <AppNavigator />
            ) : onboarded ? (
              <AuthNavigator />
            ) : (
              <OnboardNavigator />
            )}
            <StatusBar style="dark" backgroundColor="transparent" translucent />
          </SafeAreaProvider>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
