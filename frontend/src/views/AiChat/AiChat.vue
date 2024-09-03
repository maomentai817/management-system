<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { Position, Delete } from '@element-plus/icons-vue'
import { useUserStore, useAiStore, useGlobalStore } from '@/stores'
import aiAvatar from '@/assets/images/ai.png'
import { baseURL } from '@/utils/instance'
import MarkdownIt from 'markdown-it'
import { useRoute } from 'vue-router'

const md = new MarkdownIt()
const userStore = useUserStore()
const aiStore = useAiStore()
const globalStore = useGlobalStore()
const route = useRoute()

const dataAnalyze = async (memId, date, type) => {
  // 添加空AI消息
  aiStore.insertMessage('ai', '')

  // 获取AI消息索引
  const aiMessageIndex = aiStore.messages.length - 1

  isLoading.value = true
  // 调用接口
  const response = await fetch(
    `${baseURL}aistream?memId=${memId}&date=${date}&type=${type}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userStore.userInfo?.token}`
      }
    }
  )

  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')

  let done = false
  while (!done) {
    const { value, done: readerDone } = await reader.read()
    done = readerDone
    if (value) {
      const text = decoder.decode(value, { stream: true })
      const lines = text.split('$')

      lines.forEach((line) => {
        if (line.startsWith('data:')) {
          const char = line.replace('data: ', '').trim()
          console.log(char)
          if (char === '🐱') {
            aiStore.updateAiMessage(aiMessageIndex, '\n')
          } else {
            aiStore.updateAiMessage(aiMessageIndex, char)
          }
          scrollToBottom()
        }
      })
    }
  }

  // 结束
  scrollToBottom()
  isLoading.value = false
}

onMounted(async () => {
  scrollToBottom()
  if (JSON.stringify(route.query) === '{}') return
  // console.log(route.query.memId, route.query.date, route.query.type)
  await dataAnalyze(route.query.memId, route.query.date, route.query.type)
})

const userInput = ref('')
const isLoading = ref(false)
const chatBox = ref(null)
const scrollToBottom = async () => {
  await nextTick(() => {
    setTimeout(() => {
      chatBox.value.scrollTop = chatBox.value.scrollHeight
    }, 100)
  })
}

const sendMessage = async () => {
  if (userInput.value.trim() === '') return

  // 添加用户消息
  aiStore.insertMessage('user', userInput.value)
  scrollToBottom()

  // 清空输入框
  const inputMsg = userInput.value
  userInput.value = ''

  // 添加空AI消息
  aiStore.insertMessage('ai', '')

  // 获取AI消息索引
  const aiMessageIndex = aiStore.messages.length - 1

  isLoading.value = true
  // 调用接口
  const response = await fetch(`${baseURL}aistream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userStore.userInfo?.token}`
    },
    body: JSON.stringify({ message: inputMsg })
  })

  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')

  let done = false
  while (!done) {
    const { value, done: readerDone } = await reader.read()
    done = readerDone
    if (value) {
      const text = decoder.decode(value, { stream: true })
      const lines = text.split('$')

      lines.forEach((line) => {
        if (line.startsWith('data:')) {
          const char = line.replace('data: ', '').trim()
          console.log(char)
          if (char === '🐱') {
            aiStore.updateAiMessage(aiMessageIndex, '\n')
          } else {
            aiStore.updateAiMessage(aiMessageIndex, char)
          }
          scrollToBottom()
        }
      })
    }
  }

  // 结束
  scrollToBottom()
  isLoading.value = false
}

const clearMessage = async () => {
  await aiStore.clearMessage()
  ElNotification({
    message: '清空成功',
    type: 'success',
    duration: 2000
  })
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
            class="chat-title f-c fw-600 fs-20 mb-20 sticky top-0 z-10 p-y-10 duration-500"
            :class="globalStore.isDark ? 'title-dark' : 'title-light'"
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
                class="message-content text-left rounded-20 p-x-20 break-words p-y-10 f-1 duration-500 max-w-100rem"
                :class="globalStore.isDark ? 'bubble-dark' : 'bubble-light'"
              >
                {{ message.text }}
              </div>
              <div class="avatar ml-20">
                <el-avatar :src="userStore.userInfo.avatar"></el-avatar>
              </div>
            </div>
            <div v-else class="ai-message flex">
              <div class="avatar">
                <el-avatar :src="aiAvatar"></el-avatar>
              </div>
              <div
                class="message-content text-left p-x-30 break-words max-w-120rem"
              >
                <!-- 当 isLoading 为 true 且当前消息为最后一条时，使用插值表达式渲染 -->
                <template
                  v-if="isLoading && index === aiStore.messages.length - 1"
                >
                  {{ message.text ? message.text : '嘻嘻喵🐱' }} ✨
                </template>

                <!-- 当 isLoading 为 false 时，使用 v-html 渲染 message.text -->
                <template v-else>
                  <div
                    v-html="
                      md.render(
                        message.text
                          ? message.text
                              .replace(/(?<!\*)\*(?!\*)/g, '* ')
                              .replace(/([.\-])/g, '$1 ')
                          : '嘻嘻喵🐱'
                      )
                    "
                  ></div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="input-box">
          <!-- <div class="tip-btn bg-red">快捷短语</div> -->
          <el-input
            v-model="userInput"
            placeholder="请输入您的问题..."
            @keyup.enter="sendMessage"
            :disabled="isLoading"
          >
            <template #suffix>
              <el-button type="primary" @click="sendMessage" size="large" round>
                <el-icon size="20"> <Position /></el-icon>
              </el-button>
            </template>
            <template #prefix>
              <div class="clear-btn f-c cursor-pointer" @click="clearMessage">
                <el-icon size="24"> <Delete /></el-icon>
              </div>
            </template>
          </el-input>
        </div>
      </div>
    </CardContainer>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-input) {
  // border-radius: 50px !important;
  --el-input-border-radius: 50px;
}
:deep(.el-input__wrapper) {
  padding-right: 0 !important;
  padding-left: 0 !important;
}
:deep(.el-card__body) {
  padding-top: 0 !important;
}
:deep(.el-input__prefix) {
  margin-left: 18px;
}
.chat-box {
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
}
.title-light {
  background-color: #fff;
}
.title-dark {
  background-color: #1d1e1f;
}
.bubble-light {
  background-color: #f6f6f6;
}
.bubble-dark {
  background-color: #2f2f2f;
}
</style>
