import { View, Text, Image } from 'react-native'
import { Play } from 'lucide-react-native'

interface MessageProps {
  text?: string
  isAudio?: boolean
  isUser?: boolean
  timestamp?: string
  avatarUrl?: string
}

export default function Message({ text, isAudio, isUser, timestamp, avatarUrl }: MessageProps) {
  return (
    <View className={`flex-row items-end mb-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && avatarUrl && (
        <Image
          source={{ uri: avatarUrl }}
          className="w-6 h-6 rounded-full mr-2"
        />
      )}
      <View
        className={`rounded-2xl p-3 max-w-[80%] ${
          isUser
            ? 'bg-blue-500 rounded-br-none'
            : 'bg-gray-200 rounded-bl-none'
        }`}
      >
        {isAudio ? (
          <View className="flex-row items-center gap-2">
            <Play size={16} color={isUser ? 'white' : 'black'} />
            <View className="w-32 h-1 bg-gray-400 rounded-full" />
          </View>
        ) : (
          <Text className={isUser ? 'text-white' : 'text-black'}>
            {text}
          </Text>
        )}
      </View>
      {timestamp && (
        <Text className="text-xs text-gray-500 mx-2">
          {timestamp}
        </Text>
      )}
    </View>
  )
}
