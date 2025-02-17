import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

const Splash = () => {
  const { isSignedIn } = useAuth();
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
      setIsNavigationReady(true);
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  const handleNavigation = async (route: string) => {
    await router.replace(route);
  };

  const loadData = async () => {
    if (!isLoaded || !isNavigationReady) {
      return;
    }

    try {
      if (!isSignedIn) {
        await handleNavigation("/(auth)/sign-in");
        return;
      }

      if (!user) {
        Alert.alert("Error", "Something went wrong");
        await handleNavigation("/(auth)/sign-in");
        return;
      }

      await handleNavigation("/(tabs)");
    } catch (error: any) {
      console.error("Error loading user data:", error);
      Alert.alert("Error", "Something went wrong");
      await handleNavigation("/(auth)/sign-in");
    }
  };

  useEffect(() => {
    if (isNavigationReady) {
      loadData();
    }
  }, [isLoaded, isSignedIn, user, isNavigationReady]);

  return (
    <View className="bg-white flex-1">
      <SafeAreaView />
      <View className="flex-1 space-y-10 flex items-center justify-center relative p-5">
        <Text className="text-black text-center text-2xl font-pregular">
          Mayani Chatbot
        </Text>
      </View>
    </View>
  );
};

export default Splash;
