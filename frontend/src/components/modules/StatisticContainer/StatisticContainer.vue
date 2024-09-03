<script setup>
import { useTransition } from '@vueuse/core'
import { Money, Download } from '@element-plus/icons-vue'
import { watch, ref } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#faad14'
  },
  data: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'income'
  }
})

const sum = ref(0)
const outputValue = useTransition(sum, {
  duration: 1500
})
sum.value = props.data

watch(
  () => props.data,
  (newValue) => {
    sum.value = newValue
  }
)

const emit = defineEmits(['export'])
const exportCSV = () => {
  emit('export', props.type)
}
</script>

<template>
  <div class="statistic-content f-b mr-10">
    <div class="statistic-box f-c">
      <el-statistic :value="outputValue" :style="{ '--x': color }" class="f-c">
        <template #title>
          <el-icon class="mr-5 fs-20 f-c" :style="{ color: color }"
            ><money
          /></el-icon>
        </template>
      </el-statistic>
    </div>
    <div class="download-box">
      <el-button type="success" plain>
        <span class="f-c">
          <el-icon><Download /></el-icon>
          <span @click="exportCSV">导出数据</span>
        </span>
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-statistic) {
  display: flex;
  align-items: center;
}
:deep(.el-statistic__number) {
  font-weight: 600 !important;
  color: var(--x) !important;
}
</style>
