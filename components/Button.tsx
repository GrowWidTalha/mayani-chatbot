import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as Progress from "react-native-progress";
import theme from "@/constants/theme";

export const buttonVariants = cva(
  "py-[13px] px-4 rounded-[14px] flex flex-row items-center justify-between space-x-2 border-[1px]",
  {
    variants: {
      variant: {
        default: "bg-primary border-primary",
        outline: " border-neutral bg-neutral",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const buttonTextVariants = cva("text-md font-pmedium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      outline: "text-accent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Button = ({
  text,
  className,
  variant,
  leftIcon = <View className="w-6 h-6"></View>,
  rightIcon = <View className="w-6 h-6"></View>,
  onPress = () => null,
  textProps: { className: textClassName, ...textProps } = {},
  loading = false,
  disabled = false,
  style = {},
  ...props
}: {
  text: string;
  className?: string;
  variant?: "default" | "outline" | null | undefined;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  textProps?: any;
  loading?: boolean;
  style?: any;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      className={`${buttonVariants({ variant })} ${
        loading || disabled ? "opacity-60" : ""
      }`}
      onPress={() => (loading || disabled ? null : onPress())}
      disabled={loading || disabled}
      style={style}
      {...props}
    >
      {leftIcon}
      {loading ? (
        <View className={`flex flex-row items-center justify-center space-x-3`}>
          <Progress.Circle
            size={20}
            borderWidth={2}
            indeterminate={true}
            color={
              variant === "default"
                ? theme.colors.primary.foreground
                : variant === "outline"
                ? theme.colors.accent.DEFAULT
                : theme.colors.accent.foreground
            }
          />
          <Text
            className={cn(buttonTextVariants({ variant }), textClassName)}
            {...textProps}
          >
            {text}
          </Text>
        </View>
      ) : (
        <Text
          className={cn(buttonTextVariants({ variant }), textClassName)}
          {...textProps}
        >
          {text}
        </Text>
      )}
      {rightIcon}
    </TouchableOpacity>
  );
};

export default Button;
