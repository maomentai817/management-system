<script setup>
import { ref } from 'vue'
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
      <!-- <div class="outcome-box" v-else>
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
      </div> -->
    </div>
    <div class="filter-btn">
      <div class="btn-group">
        <el-button type="primary" plain>查询</el-button>
        <el-button type="primary" plain>重置</el-button>
        <el-button type="primary" plain>新增</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-date-editor) {
  width: 100%;
}
</style>
