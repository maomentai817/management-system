import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMemberAPI, addMemberAPI } from '@/api/member'

export const useMemberStore = defineStore('member', () => {
  // state
  const members = ref([])

  const initMembers = async () => {
    const res = await getMemberAPI()
    members.value = res.data
  }
  initMembers()

  const addMember = async (info) => {
    const res = await addMemberAPI(info)
    if (res.status === 200) {
      await initMembers()
      ElMessage.success('新增用户成功')
    }
  }

  return {
    members,
    initMembers,
    addMember
  }
})
