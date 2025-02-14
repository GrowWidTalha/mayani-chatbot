import { Text } from "react-native";
import { cn } from "@/lib/utils";

interface LabelProps {
  text: string;
  className?: string;
  error?: boolean;
}

const Label = ({ text, className, error }: LabelProps) => {
  return (
    <Text
      className={cn(
        "text-[15px] font-pregular text-left",
        error ? "text-error" : "text-base2",
        className
      )}
    >
      {text}
    </Text>
  );
};

export default Label;
