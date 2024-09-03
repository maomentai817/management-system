import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI, updateAvatarAPI, updateUsernameAPI } from '@/api/user.js'

export const useUserStore = defineStore(
  'user',
  () => {
    // state
    const userInfo = ref({})
    // actions
    const getUserInfo = async ({ username, password }) => {
      const res = await loginAPI({ username, password })
      // console.log(res)
      if (res.status === 200) {
        userInfo.value = res.data
      }
      return res
    }
    const clearUserInfo = () => {
      userInfo.value = {}
    }

    const updateAvatar = async (baseStr, username) => {
      await updateAvatarAPI(baseStr, username)
      userInfo.value.avatar = baseStr
    }

    const updateUsername = async (username, newUsername) => {
      await updateUsernameAPI(username, newUsername)
      userInfo.value.username = newUsername
    }
    // getters
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
      updateAvatar,
      updateUsername
    }
  },
  // 本地持久化
  {
    persist: true
  }
)
