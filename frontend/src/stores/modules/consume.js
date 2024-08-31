import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getIncomeAPI,
  getOutcomeAPI,
  getConsumeAPI,
  getAllTagsAPI,
  deleteConsumeAPI,
  addConsumeAPI,
  updateConsumeAPI
} from '@/api/consume'
import { ElMessage } from 'element-plus'

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
  getConsumeData()
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

  const refresh = () => {
    getConsumeData()
    getIncomeData()
    getOutcomeData()
    getTags()
  }
  // 删除操作
  const deleteConsume = async (id) => {
    const res = await deleteConsumeAPI(id)
    if (res.status === 200) {
      ElMessage.success('删除成功')
      refresh()
    }
  }
  // 新增操作
  const addConsume = async (info) => {
    const res = await addConsumeAPI(info)
    if (res.status === 200) {
      ElMessage.success('新增成功')
      refresh()
    }
  }
  // 编辑操作
  const editConsume = async (info, id) => {
    const res = await updateConsumeAPI(info, id)
    if (res.status === 200) {
      ElMessage.success('编辑成功')
      refresh()
    }
  }
  return {
    consumeList,
    incomeList,
    outcomeList,
    tags,
    getTags,
    getIncomeData,
    getOutcomeData,
    getConsumeData,
    deleteConsume,
    refresh,
    addConsume,
    editConsume
  }
})
