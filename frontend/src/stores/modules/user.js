import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/api/user.js'

export const useUserStore = defineStore(
  'user',
  () => {
    // state
    const userInfo = ref({})
    // actions
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      console.log(res)
      if (res.status === 200) {
        userInfo.value = res
      }
      return res
    }

    const clearUserInfo = () => {
      userInfo.value = {}
    }
    // getters
    return {
      userInfo,
      getUserInfo,
      clearUserInfo
    }
  },
  // 本地持久化
  {
    persist: true
  }
)
