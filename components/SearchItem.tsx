import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";
import theme from "@/constants/theme";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { router } from "expo-router";
import { ATSImageHandler } from "@/lib/utils";

const { height, width } = Dimensions.get("window");

const itemScale = (width * 0.9) / 4;

const SearchItem = ({
  title,
  image,
  id,
  selected = false,
  onPress = () => null,
  touchProps = {},
  ...props
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`my-2 mr-3 px-3 py-2 flex flex-row items-center justify-center space-x-2 bg-gray-100 border-[2px] border-gray-100 rounded-lg
      ${selected ? "border-primary" : "border-transparent"}`}
      {...props}
    >
      {image ? (
        <Image
          style={{
            height: 20,
            width: 20,
          }}
          source={{
            uri: ATSImageHandler(image),
          }}
        />
      ) : (
        <View style={{ height: 20, width: 0 }} />
      )}
      <Text
        className="text-[11px] text-center text-warp m-0 p-0 text-primary font-pregular pt-[2px]"
        style={{
          color: theme.colors.base2,
        }}
      >
        {title.trim()}
      </Text>
      <View style={{ height: 20, width: 0 }} />
    </TouchableOpacity>
  );
};

export const SearchItemPlaceholder = ({ placeholderWidth = 120 }: any) => {
  return (
    <ShimmerPlaceHolder
      style={{
        width: placeholderWidth,
        height: 40,
        borderRadius: 8,
        marginRight: 12,
      }}
    />
  );
};

export const SearchContainer = ({ children, ...props }: any) => {
  return (
    <ScrollView
      contentContainerStyle={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export const SearchContainerPlaceholder = ({ count = 4 }: any) => {
  return (
    <SearchContainer>
      <SearchItemPlaceholder placeholderWidth={50} />
      {[...Array(count > 2 ? count - 1 : 0)].map((_, index) => (
        <SearchItemPlaceholder key={index} />
      ))}
    </SearchContainer>
  );
};

export default SearchItem;
