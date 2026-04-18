import '@/global.css';
import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { ThemeProvider, useTheme } from '@/lib/theme-context';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(auth)',
};

export default function RootLayout() {
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
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}

function ThemedStack() {
  const { isDark } = useTheme();
  return (
    <NavThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/avatar-selection" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="camera"
          options={{ headerShown: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="analysis"
          options={{ headerShown: false, animation: 'slide_from_right' }}
        />
      </Stack>
    </NavThemeProvider>
  );
}
