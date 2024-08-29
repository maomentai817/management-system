import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMemberAPI } from '@/api/member'

export const useMemberStore = defineStore('member', () => {
  // state
  const members = ref([])

  const initMembers = async () => {
    const res = await getMemberAPI()
    members.value = res.data
  }

  return {
    members,
    initMembers
  }
})
