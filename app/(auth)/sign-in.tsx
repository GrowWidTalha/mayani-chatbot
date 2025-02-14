import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import Header from "@/components/Header";
  import Button from "@/components/Button";
  import { router } from "expo-router";
  import Label from "@/components/Label";
  import FormField from "@/components/FormField";
  import { useSignIn, useUser } from "@clerk/clerk-expo";
  import Input from "@/components/Input";

  const { width } = Dimensions.get("window");

  const SignIn = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const { user } = useUser();

    const [credentials, setCredentials] = useState({
      email: "",
      password: "",
    });
    const [message, setMessage] = useState({
      type: "",
      message: "",
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
      if (!isLoaded) return;
      setLoading(true);
      setMessage({ type: "", message: "" });

      try {
        const signInAttempt = await signIn.create({
          identifier: credentials.email,
          password: credentials.password,
        });

        // Set the user session active
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)");
      } catch (err: any) {
        setMessage({
          type: "error",
          message: err.errors?.[0]?.message || "Error signing in",
        });
      } finally {
        setLoading(false);
      }
    };

    return (
      <View className="bg-white flex-1">
        <SafeAreaView />
        <Header title="Sign In" variant="detail" />

        <ScrollView
          className="rounded-t-[35px] bg-background2 flex flex-col space-y-4 p-8 mt-4 w-full"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex flex-col  items-center justify-start space-y-4 w-full">
            <FormField className="gap-3 mb-4">
              <Label text="Email" />
              <Input
                variant="primary"
                value={credentials.email}
                onChange={(value: string) =>
                  setCredentials({ ...credentials, email: value })
                }
                placeholder="eg. jhon.doe@example.com"
                type="email"
                disabled={loading}
              />
            </FormField>

            <FormField className="gap-3 mt-2 mb-4">
              <Label text="Password" />
              <Input
                variant="primary"
                value={credentials.password}
                onChange={(value: string) =>
                  setCredentials({ ...credentials, password: value })
                }
                placeholder="********"
                type="password"
                disabled={loading}
              />
            </FormField>

            {message.type === "error" && message.message && (
              <Text className="text-[16px] font-pregular text-red-600 mb-4">
                {message.message}
              </Text>
            )}

            <Button
              text="Sign In"
              loading={loading}
              variant="default"
              className="w-full mb-4"
              onPress={onSubmit}
            />

            <View className="flex flex-row items-center justify-center space-x-1 mb-4 mt-4">
              <Text className="text-sm text-gray-600 font-pregular">
                Don't have an account?
              </Text>
              <TouchableOpacity
               className="ml-1"
                onPress={() => {
                  router.replace("/(auth)/sign-up");
                }}
              >
                <Text className="text-sm underline text-primary font-psemibold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  export default SignIn;
