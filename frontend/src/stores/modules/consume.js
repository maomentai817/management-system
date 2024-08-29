import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getIncomeAPI, getOutcomeAPI, getConsumeAPI } from '@/api/consume'

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
  return {
    consumeList,
    incomeList,
    outcomeList,
    getIncomeData,
    getOutcomeData,
    getConsumeData
  }
})
