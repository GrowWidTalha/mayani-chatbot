import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Message from './message'
import MessageInput from './message-input'
import { useState } from 'react'

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello how are you?', isUser: true, timestamp: '2:30pm' },
    {
      id: 2,
      isAudio: true,
      isUser: false,
      timestamp: '2:30pm',
      avatarUrl: '/placeholder.svg'
    },
    { id: 3, text: 'Hello how are you?', isUser: true, timestamp: '2:30pm' },
    {
      id: 4,
      isAudio: true,
      isUser: false,
      timestamp: '2:30pm',
      avatarUrl: '/placeholder.svg'
    }
  ])



  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        {messages.map(message => (
          <Message key={message.id} {...message} />
        ))}
      </ScrollView>
    </View>
  )
}
