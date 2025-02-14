import { View, TextInput, TouchableOpacity } from "react-native";
import { Send } from "lucide-react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

interface MessageInputProps {
  onSend: (message: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <View className="flex-row items-center p-2 border-t mt-auto border-gray-200 bg-white">
      <Input
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2"
        placeholder="Your Message"
        value={message}
        onChange={setMessage}
      />
      <Button
        text=""
        onPress={handleSend}
        className="w-10 h-10 bg-primary rounded-full "
        leftIcon={<Send size={20} color="white" />}
      />
    </View>
  );
}
