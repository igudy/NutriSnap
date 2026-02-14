import '@/global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(auth)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    'GoogleSans-Regular': require('../assets/fonts/googleSans/GoogleSans-Regular.ttf'),
    'GoogleSans-Medium': require('../assets/fonts/googleSans/GoogleSans-Medium.ttf'),
    'GoogleSans-SemiBold': require('../assets/fonts/googleSans/GoogleSans-SemiBold.ttf'),
    'GoogleSans-Bold': require('../assets/fonts/googleSans/GoogleSans-Bold.ttf'),
    'GoogleSans-Italic': require('../assets/fonts/googleSans/GoogleSans-Italic.ttf'),
    'GoogleSans-MediumItalic': require('../assets/fonts/googleSans/GoogleSans-MediumItalic.ttf'),
    'GoogleSans-SemiBoldItalic': require('../assets/fonts/googleSans/GoogleSans-SemiBoldItalic.ttf'),
    'GoogleSans-BoldItalic': require('../assets/fonts/googleSans/GoogleSans-BoldItalic.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/avatar-selection" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
