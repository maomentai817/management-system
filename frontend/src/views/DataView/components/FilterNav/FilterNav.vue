<script setup>
import { useMemberStore } from '@/stores'
import { ref } from 'vue'

const memberStore = useMemberStore()
const members = memberStore.members.map((item) => {
  return { value: item.name, label: item.name, id: item.memId }
})

const props = defineProps({
  memId: {
    type: Number,
    default: 0
  }
})
const memVal = ref(props.memId === 0 ? '' : props.memId)
const date = ref('')
const type = ref('all')

const emits = defineEmits(['filter', 'reset', 'analyze'])
const resetHandle = () => {
  memVal.value = ''
  date.value = ''
  type.value = 'all'
  emits('reset')
}

const filterHandle = () => {
  let formattedDate = ''
  if (date.value) {
    const selDate = new Date(date.value)
    formattedDate = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit'
    }).format(selDate)
  }
  emits('filter', {
    memVal: memVal.value,
    date: formattedDate,
    type: type.value
  })
}

const handleAnalyze = () => {
  let dateStr = ''
  let name = ''
  if (date.value) {
    dateStr = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit'
    }).format(new Date(date.value))
  }
  if (memVal.value) {
    name = members.find((item) => item.id === memVal.value)?.label
  }

  let message = ''
  let typeStr = `${type.value === 'all' ? '收支' : type.value === 'income' ? '收入' : '支出'}`
  if (dateStr && name)
    message = `请帮我分析 ${name} 在 ${dateStr} 的${typeStr}情况`
  else if (dateStr && !name) message = `请帮我分析 ${dateStr} 的${typeStr}情况`
  else if (!dateStr && name) message = `请帮我分析 ${name} 的${typeStr}情况`
  else message = `请帮我分析总${typeStr}情况`

  const info = {
    memId: memVal.value || '',
    date: dateStr || '',
    type: type.value,
    message
  }
  emits('analyze', info)
}
</script>

<template>
  <div class="filter-box f-b mr-10">
    <div class="filter-content f-b w-80%">
      <div class="income-box f-b w-full">
        <div class="mem-sel w-30%">
          <el-select v-model="memVal" placeholder="请选择用户名">
            <el-option
              v-for="item in members"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="date-sel w-30%">
          <el-date-picker
            v-model="date"
            type="month"
            placeholder="请选择日期"
          />
        </div>
        <div class="type-sel w-30%">
          <el-select v-model="type" placeholder="请选择类型">
            <el-option label="全部" value="all"></el-option>
            <el-option label="收入" value="income"></el-option>
            <el-option label="支出" value="outcome"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="filter-btn">
      <div class="btn-group">
        <el-button type="primary" plain @click="handleAnalyze"
          >数据分析</el-button
        >
        <el-button type="primary" plain @click="filterHandle">查询</el-button>
        <el-button type="primary" plain @click="resetHandle">重置</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-date-editor) {
  width: 100%;
}
</style>
