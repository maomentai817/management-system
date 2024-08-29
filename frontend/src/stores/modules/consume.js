import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getIncomeAPI,
  getOutcomeAPI,
  getConsumeAPI,
  getAllTagsAPI
} from '@/api/consume'

export const useConsumeStore = defineStore('consume', () => {
  // state
  const consumeList = ref([])
  const incomeList = ref([])
  const outcomeList = ref([])

  // 获取消费记录
  const getConsumeData = async () => {
    const res = await getConsumeAPI()
    consumeList.value = res.data
  }
  // 获取收入
  const getIncomeData = async () => {
    const res = await getIncomeAPI()
    incomeList.value = res.data
  }

  // 获取支出
  const getOutcomeData = async () => {
    const res = await getOutcomeAPI()
    outcomeList.value = res.data
  }

  // 获取 tags
  const tags = ref([])
  const getTags = async () => {
    const res = await getAllTagsAPI()
    tags.value = res.data
  }
  return {
    consumeList,
    incomeList,
    outcomeList,
    tags,
    getTags,
    getIncomeData,
    getOutcomeData,
    getConsumeData
  }
})
