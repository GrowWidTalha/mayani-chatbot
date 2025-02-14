import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import Header from "@/components/Header";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import FormField from "@/components/FormField";
import Label from "@/components/Label";

const Settings = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [password, setPassword] = useState("********");


  return (
    <View>
      <SafeAreaView />
      <Header title="Settings" variant="master" />
      <View className="mx-6 flex flex-col">
        <View className="mt-4 gap-4">
          <Input placeholder="Name" value={email} onChange={setEmail} disabled />
          <FormField>
              <Label text="Password" />
              <Input
                value={password}
                onChange={setPassword}
                placeholder="********"
                type="password"
                disabled
              />
            </FormField>
          {/* <View className="items-end">
            <Button text={isEditing ? "Update" : "Edit"} onPress={() => setIsEditing(!isEditing)} />
          </View> */}
        </View>

        <TouchableOpacity
          className="bg-red-400/25  border-none p-4 rounded-xl mt-12"
          onPress={async () => {
            await signOut();
            await router.replace("/(auth)/sign-in");
          }}
        >
          <Text className="font-bold text-lg text-center ">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
