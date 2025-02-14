import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

import "./globals.css";
import { tokenCache } from "@/cache";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Alert, StatusBar } from "react-native";
const publishableKey = "pk_test_aG9seS1kdWNrbGluZy03LmNsZXJrLmFjY291bnRzLmRldiQ";

if (!publishableKey) {
    Alert.alert("Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env")
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ThemeProvider value={DefaultTheme}>

      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar barStyle={"dark-content"}/>
      </ClerkLoaded>
      </ThemeProvider>

    </ClerkProvider>
  );
}
