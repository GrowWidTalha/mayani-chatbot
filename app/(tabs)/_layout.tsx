import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import { HomeIcon, Settings } from "lucide-react-native";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({focused, color}) =><View className={`${focused && "bg-accent-100/50 rounded-full p-1 px-2"}`}>
          <HomeIcon  color={color}/>
        </View>
        }}
      />
      <Tabs.Screen
        name="settings"

        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View className={`${focused && "bg-accent-100/50 rounded-full p-1 px-2"}`}>
              <Settings  color={color}/>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
