import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image, Alert } from "react-native";
import * as Progress from "react-native-progress";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, useFocusEffect, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

const Splash = () => {
  const { isSignedIn, signOut } = useAuth();
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [isUnmounting, setIsUnmounting] = useState(false);

  useEffect(() => {
    // Prevent auto-hiding of splash screen
    SplashScreen.preventAutoHideAsync();

    // Mark navigation as ready after a short delay
    const timer = setTimeout(() => {
      setIsNavigationReady(true);
      SplashScreen.hideAsync();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = async (route: string) => {
    setIsUnmounting(true);
    // Wait for unmount animation/cleanup
    await new Promise((resolve) => setTimeout(resolve, 0));
    // @ts-ignore
    await router.replace(route);
  };

  const loadData = async () => {
    if (!isLoaded || !isNavigationReady || isUnmounting) {
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
      return;
    } catch (error: any) {
      console.error("Error loading user data:", error);
      Alert.alert("Error", "Something went wrong");
      await handleNavigation("/(auth)/sign-in");
    }
  };

  useEffect(() => {
    if (isNavigationReady && !isUnmounting) {
      loadData();
    }
  }, [isLoaded, isSignedIn, user, isNavigationReady]);

  if (isUnmounting) {
    return null;
  }

  return (
    <View className="bg-white flex-1">
      <SafeAreaView />
      <View className="flex-1 space-y-10 flex items-center justify-center relative p-5">
        {/* <Image
          source={require("@/assets/images/logo.png")}
          width={170}
          height={79}
          style={{
            width: 170,
            height: 79,
          }}
        /> */}
        <Text className="text-black text-center text-2xl font-pregular">
          Mayani Chatbot
        </Text>

        <View className="flex flex-col space-y-5 items-center justify-center absolute bottom-10">
          <View className="animate-spin">
            <Progress.Circle size={30} borderWidth={1.2} indeterminate={true} />
          </View>
          <Text className="text-accent-100 text-sm font-pregular">
            © Mayani Chatbot
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Splash;
