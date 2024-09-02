<script setup>
import { ref, nextTick } from 'vue'
import { Position, Delete } from '@element-plus/icons-vue'
import { useUserStore, useAiStore } from '@/stores'
import aiAvatar from '@/assets/images/ai.png'
import { chatAPI } from '@/api/ai'
// import { baseURL } from '@/utils/instance'

const userStore = useUserStore()
const aiStore = useAiStore()
const userInput = ref('')
const isLoading = ref(false)

const chatBox = ref(null)
const scrollToBottom = () => {
  nextTick(() => {
    setTimeout(() => {
      chatBox.value.scrollTop = chatBox.value.scrollHeight
    }, 100)
  })
}

// const aiText = ref('')
// const sendMessage = async () => {
//   if (userInput.value.trim() === '') return
//   // 添加用户消息
//   aiStore.insertMessage('user', userInput.value)
//   // 清空输入框
//   const inputMsg = userInput.value
//   userInput.value = ''
//   // 调用接口
//   isLoading.value = true
//   const res = await chatAPI(inputMsg)
//   console.log(res)
//   aiStore.insertMessage('ai', res.result)
//   // scrollToBottom()
//   for (let i = 0; i < res.result.length; i++) {
//     await new Promise((resolve) => setTimeout(resolve, 50))
//     aiText.value += res.result[i]
//     scrollToBottom()
//   }
//   isLoading.value = false
// }
const sendMessage = async () => {
  if (userInput.value.trim() === '') return

  // 添加用户消息
  aiStore.insertMessage('user', userInput.value)

  // 清空输入框
  const inputMsg = userInput.value
  userInput.value = ''

  // 添加空AI消息
  aiStore.insertMessage('ai', '')

  // 获取AI消息索引
  const aiMessageIndex = aiStore.messages.length - 1

  // 调用接口
  isLoading.value = true
  const res = await chatAPI(inputMsg)
  isLoading.value = false

  // // 逐字更新AI消息
  // await aiStore.updateAiMessage(aiMessageIndex, res.result)
  // scrollToBottom()
  // 逐字更新AI消息
  for (let i = 0; i < res.result.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 50)) // 延迟以实现打字效果
    aiStore.messages[aiMessageIndex].text += res.result[i]
    scrollToBottom() // 每次更新内容后滚动到底部
  }
}
</script>

<template>
  <div class="ai-container h-full">
    <CardContainer class="h-full">
      <div class="chat-container w-full fd-col h-95%">
        <div
          class="chat-box overflow-y-auto mb-15 rounded-8 h-full fd-col relative"
          ref="chatBox"
        >
          <div
            class="chat-title f-c fw-600 fs-20 mb-20 sticky top-0 z-10 bg-white p-y-10"
          >
            AI 助手 🐱🐱🐱
          </div>
          <div
            v-for="(message, index) in aiStore.messages"
            :key="index"
            class="chat-message mb-10 p-x-1.25em fs-18 max-w-140rem"
            :style="{
              'align-self': message.type === 'user' ? 'flex-end' : 'flex-start'
            }"
          >
            <div v-if="message.type === 'user'" class="user-message f-c">
              <div
                class="message-content text-left bgc-#f6f6f6 rounded-20 p-x-20 break-words p-y-10 f-1 max-w-100rem"
              >
                {{ message.text }}
              </div>
              <div class="avatar ml-20">
                <el-avatar :src="userStore.userInfo.avatar"></el-avatar>
              </div>
            </div>
            <div v-else class="ai-message f-b">
              <div class="avatar f-c">
                <el-avatar :src="aiAvatar"></el-avatar>
              </div>
              <div
                class="message-content text-left p-x-30 break-words max-w-120rem"
              >
                {{ message.text }}
              </div>
            </div>
          </div>
        </div>
        <div class="input-box">
          <el-input
            v-model="userInput"
            placeholder="请输入您的问题..."
            @keyup.enter="sendMessage"
            :disabled="isLoading"
          >
            <template #suffix>
              <el-button type="primary" @click="sendMessage" size="large">
                <el-icon size="20"> <Position /></el-icon>
              </el-button>
            </template>
            <template #prefix>
              <el-button
                type="primary"
                @click="aiStore.clearMessage"
                plain
                size="large"
              >
                <el-icon size="20"> <Delete /></el-icon>
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
    </CardContainer>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  padding-right: 0 !important;
  padding-left: 0 !important;
}
:deep(.el-card__body) {
  padding-top: 0 !important;
}
</style>
