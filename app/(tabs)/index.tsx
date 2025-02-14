"use client"

import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import { useState, useRef } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useUser } from "@clerk/clerk-expo"
import { SendHorizonal } from "lucide-react-native"
import Header from "@/components/Header"

interface Message {
  role: "user" | "assistant"
  content: string
}

const AiBuddy = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingResponse, setLoadingResponse] = useState(false)
  const { user } = useUser()
  const scrollViewRef = useRef<ScrollView>(null)

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: "user", content: input.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)
    setLoadingResponse(true)

    try {
      const response = await fetch("https://lightning-programming-advertiser-millennium.trycloudflare.com/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      if (data.success) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.data.result,
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        console.error("Failed to send message to AI", data)
      }
    } catch (error) {
      console.error("Error sending message to AI:", error)
    } finally {
      setLoading(false)
      setLoadingResponse(false)
    }
  }

  return (
    <View className="flex-1 bg-white">
      <Header title="Mayani" variant="master" />
      <SafeAreaView className="flex-1">
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 p-4"
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.length === 0 && (
            <View className="flex-1 items-center justify-center mt-52">
              <Image source={require("@/assets/images/mayani.jpg")} className="w-52 h-52 rounded-full" />
            </View>
          )}
          {messages.map((message, index) => (
            <View key={index} className={`mb-4 ${message.role === "user" ? "items-end" : "items-start"}`}>
              <View className={`p-3 rounded-2xl ${message.role === "user" ? "bg-primary-500" : "bg-secondary-50"}`}>
                <Text className={`${message.role === "user" ? "text-white" : "text-accent"}`}>{message.content}</Text>
              </View>
            </View>
          ))}
          {loadingResponse && (
            <View className="items-start mb-4">
              <View className="bg-secondary-50 p-3 rounded-2xl">
                <View className="flex-row items-center">
                  <ActivityIndicator size="small" color="#0000ff" />
                  <Text className="text-accent ml-2">Typing...</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        <View className="p-4 border-t border-gray-200 flex-row space-x-2">
          <TextInput
            className="flex-1 bg-secondary-50 rounded-full px-4 py-2"
            placeholder="Ask anything..."
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={sendMessage}
            disabled={loading || loadingResponse}
            className={`w-12 h-12 rounded-full items-center justify-center ${
              loading || loadingResponse ? "bg-gray-400" : "bg-primary-500"
            }`}
          >
            {loading ? <ActivityIndicator size="small" color="white" /> : <SendHorizonal size={24} color="white" />}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default AiBuddy
