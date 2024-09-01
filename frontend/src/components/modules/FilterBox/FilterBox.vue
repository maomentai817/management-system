<script setup>
import { ref } from 'vue'
import { formatDate } from '@/utils/formatTime'
const props = defineProps({
  type: {
    type: Boolean,
    default: false // true 收入 false 支出
  },
  memOptions: {
    type: Array,
    default: () => []
  },
  tagOptions: {
    type: Array,
    default: () => []
  }
})

// 用户名筛选项
const members = ref([])
members.value = props.memOptions
const memVal = ref('')
// 消费标签筛选项
const tags = ref([])
tags.value = props.tagOptions
const tagVal = ref('')
// 日期
const date = ref('')

const emits = defineEmits(['filter', 'reset', 'add'])
const filterHandle = () => {
  if (memVal.value || date.value || tagVal.value) {
    emits('filter', {
      name: memVal.value,
      consumeDate: formatDate(date.value),
      category: tagVal.value
    })
  } else {
    ElNotification({
      message: '请至少选择一个筛选条件',
      type: 'error',
      duration: 2000
    })
  }
}
const resetHandle = () => {
  if (memVal.value || date.value || tagVal.value) {
    memVal.value = ''
    date.value = ''
    tagVal.value = ''
    emits('reset')
  } else {
    ElNotification({
      message: '没有需要重置的筛选条件',
      type: 'warning',
      duration: 2000
    })
  }
}

const addHandle = () => {
  emits('add')
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
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="date-sel w-30%">
          <el-date-picker v-model="date" type="date" placeholder="请选择日期" />
        </div>
        <div class="tag-sel w-30%">
          <el-select v-model="tagVal" placeholder="请选择标签">
            <el-option
              v-for="item in tags"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </div>
    <div class="filter-btn">
      <div class="btn-group">
        <el-button type="primary" plain @click="filterHandle">查询</el-button>
        <el-button type="primary" plain @click="resetHandle">重置</el-button>
        <el-button type="primary" plain @click="addHandle">新增</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-date-editor) {
  width: 100%;
}
</style>
