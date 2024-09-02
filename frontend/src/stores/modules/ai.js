import { defineStore } from 'pinia'
import { ref } from 'vue'
import { clearAiAPI } from '@/api/ai.js'

export const useAiStore = defineStore(
  'chat',
  () => {
    const messages = ref(JSON.parse(localStorage.getItem('chat') || '[]'))
    if (messages.value.length === 0) {
      messages.value = [
        { type: 'ai', text: '你好, 我是AI, 请问有什么可以帮到您的?' }
      ]
    }

    // 插入聊天记录
    const insertMessage = (type, text) => {
      messages.value.push({ type, text })
    }
    // 清除记录
    const clearMessage = async () => {
      await clearAiAPI()
      messages.value = [
        { type: 'ai', text: '你好, 我是AI, 请问有什么可以帮到您的?' }
      ]
    }

    // 逐字更新AI消息
    const updateAiMessage = async (index, fullText) => {
      for (let i = 0; i < fullText.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50))
        messages.value[index].text += fullText[i]
      }
    }
    return {
      messages,
      insertMessage,
      clearMessage,
      updateAiMessage
    }
  },
  // 本地持久化
  {
    persist: true
  }
)
