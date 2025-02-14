import { Pressable, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import theme from "@/constants/theme";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Input variants remain the same
export const inputVariants = cva(
  "w-full flex flex-row justify-center items-center space-x-4 px-5 py-1 rounded-2xl",
  {
    variants: {
      variant: {
        default: "bg-[#D9D9D9]/30",
        primary: "bg-neutral",
        outline: "bg-transparent border-[1px] border-primary",
        error: "bg-error/10 border-[1px] border-error",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const inputTextVariants = cva("text-sm font-pregular", {
  variants: {
    variant: {
      default: "text-accent",
      primary: "text-accent",
      outline: "text-primary",
      error: "text-error",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface InputProps {
  type?: string;
  value?: string;
  onChange?: (value: any) => void;
  placeholder?: string;
  inputClassName?: string;
  variant?: "default" | "primary" | "outline" | "error";
  size?: "default" | "sm" | "lg";
  inputProps?: any;
  className?: string;
  style?: any;
  readonly?: boolean;
  disabled?: boolean;
  error?: boolean;
}

const Input = ({
  type = "text",
  value = "",
  onChange = (value: any) => null,
  placeholder,
  inputClassName,
  variant,
  inputProps,
  className,
  style,
  readonly = false,
  disabled = false,
  error = false,
}: InputProps) => {
  const inputRef = React.useRef<any>(null);
  const [isPassword, setIsPassword] = React.useState(false);

  const currentVariant = error ? "error" : variant;

  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 1.0 : 1.0 }]}
      onPress={() => !disabled && (inputRef ? inputRef.current.focus() : null)}
    >
      <View
        className={cn(
          inputVariants({ variant: currentVariant }),
          disabled ? "opacity-80" : "",
          className
        )}
        style={[
          {
            height: type === "textArea" ? 120 : undefined,
            alignItems: type === "textArea" ? "flex-start" : "center",
          },
          style,
        ]}
      >
        <TextInput
          ref={inputRef}
          multiline={type === "textArea"}
          numberOfLines={type === "textArea" ? 4 : 1}
          autoCapitalize={
            type === "password" || type === "email" ? "none" : undefined
          }
          autoCorrect={type === "password" ? true : undefined}
          secureTextEntry={type === "password" && !isPassword}
          keyboardType={type === "number" ? "numeric" : "default"}
          textContentType={type}
          className={cn(
            inputTextVariants({ variant: currentVariant }),
            "flex-1 h-[45px] overflow-hidden",
            inputClassName
          )}
          value={value}
          selectionColor={theme.colors.primary.DEFAULT}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.foreground}
          onChangeText={onChange}
          editable={!disabled}
          {...inputProps}
        />

        {type === "password" && (
          <TouchableOpacity
            style={{ height: 40, width: 40 }}
            className={`flex items-center justify-center -mr-[10px] ${
              disabled ? "opacity-50" : ""
            }`}
            onPress={() => !disabled && setIsPassword(!isPassword)}
            disabled={disabled}
          >
            {!isPassword ? (
              <EyeSlashIcon
                color={theme.colors.foreground}
                size={20}
                opacity={0.6}
                strokeWidth={2}
              />
            ) : (
              <EyeIcon
                color={theme.colors.foreground}
                size={20}
                opacity={0.6}
                strokeWidth={2}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  );
};

export default Input;
