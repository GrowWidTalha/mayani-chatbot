import {
  Alert,
  Dimensions,
  Image,
  Modal,
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
import { useAuth, useSignUp, useUser } from "@clerk/clerk-expo";
import Input from "@/components/Input";
import { SvgXml } from "react-native-svg";
import { svgIcons } from "@/constants/icons";
import theme from "@/constants/theme";
import { ChevronRightIcon } from "react-native-heroicons/outline";

const { width } = Dimensions.get("window");

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const { user } = useUser();

  const { signOut } = useAuth();

  const onSubmit = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setMessage({ type: "", message: "" });

    try {
      console.log("🚀 ~ onSubmit ~ credentials:", credentials);
      // Create the user with Clerk
      await signUp.create({
        emailAddress: credentials.email,
        password: credentials.password,
      });
      console.log("SignUp Processed");

      // Prepare verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      console.log("Verification Prepared");
      setPendingVerification(true);
      console.log("Pending Verification Set");
    } catch (err: any) {
      setMessage({
        type: "error",
        message: err.errors?.[0]?.message || "Error creating account",
      });
    }

    setLoading(false);
  };

  const onVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setMessage({ type: "", message: "" });

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
router.push("/(tabs)")
        setSuccessPopup(true);
      } else {
        setMessage({
          type: "error",
          message: "Verification failed",
        });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        message: err.errors?.[0]?.message || "Error verifying email",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal visible={successPopup} animationType="slide" transparent>
        <SafeAreaView />
        <View className="w-full h-full bg-neutral-700/20">
          <View className="absolute bottom-0 p-6 pt-3 flex flex-col items-center justify-end blur-10xl space-y-4 bg-neutral-500 rounded-t-[35px] w-full">
            <View className="absolute top-3 bg-neutral-600 h-[6px] rounded-full w-[80px]" />
            <SvgXml
              xml={svgIcons.verifiedCheck}
              width={100}
              color={theme.colors.success[300]}
            />
            <Text className="text-lg font-psemibold text-secondary-400">
              Account Created Successfully!
            </Text>
            <Text className="text-sm font-pregular text-center text-secondary-400">
              You can now start your journey with Fascination. Set up your
              profile to begin receiving orders and start delivering.
            </Text>

            <Button
              text="Set Up Your Profile"
              variant="default"
              className="w-full mt-4" // Added spacing
              rightIcon={
                <ChevronRightIcon color={theme.colors.primary[50]} size={20} />
              }
              onPress={async () => {
                setSuccessPopup(false);
                router.replace("/(tabs)");
              }}
            />
          </View>
        </View>
      </Modal>

      <View className="bg-white flex-1">
        <SafeAreaView />
        <Header title="Sign Up" variant="detail" />

        <ScrollView
          className="rounded-t-[35px] bg-background2 flex flex-col space-y-4 p-8 mt-4 w-full"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex flex-col items-center justify-start space-y-4 w-full">
            {!pendingVerification ? (
              <View className="space-y-4 flex flex-col items-center">
                <FormField className="gap-3 mb-4">
                  {" "}
                  // Added spacing
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
                  text="Sign Up"
                  loading={loading}
                  variant="default"
                  className="w-full mb-4"
                  onPress={onSubmit}
                />
                   <View className="flex flex-row items-center justify-center space-x-1 mb-4 mt-4">
                  <Text className="text-sm text-gray-600 font-pregular">
                  Already have an account?
                  </Text>
                  <TouchableOpacity
                  className="ml-1"
                    onPress={() => {
                      router.replace("/(auth)/sign-in");
                    }}
                  >
                    <Text className="text-sm underline text-primary font-psemibold">
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View className="space-y-4 flex flex-col items-center">
                <FormField className="gap-3 mb-4">
                  <Label text="Verification Code" />
                  <Input
                    variant="primary"
                    value={verificationCode}
                    onChange={setVerificationCode}
                    placeholder="Enter code sent to your email"
                    type="text"
                    disabled={loading}
                  />
                </FormField>

                <View className="flex flex-row justify-start items-start">
                  <TouchableOpacity
                    onPress={() => {
                      setVerificationCode("");
                      setPendingVerification(false);
                    }}
                    className="flex-1 pl-3"
                  >
                    <Text className="text-primary text-left font-psemibold text-xs">
                      Edit email?
                    </Text>
                  </TouchableOpacity>
                </View>

                {message.type === "error" && message.message && (
                  <Text className="text-[16px] font-pregular text-red-600 mb-4">
                    {message.message}
                  </Text>
                )}

                <Button
                  text="Verify Email"
                  loading={loading}
                  variant="default"
                  className="w-full mb-4"
                  onPress={onVerify}
                />

              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SignUp;
