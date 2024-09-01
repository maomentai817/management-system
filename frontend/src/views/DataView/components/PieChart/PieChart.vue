<script setup>
import * as echarts from 'echarts'
import { onMounted, watch } from 'vue'
import { usePieConfig } from '../../composables/usePieConfig'

const props = defineProps({
  memId: {
    type: Number,
    default: 0
  },
  date: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'all'
  }
})

let myChart = null
// 定义更新图表的函数
function updateChart() {
  if (!myChart) return
  const { optionPost } = usePieConfig(props.memId, props.date, props.type)
  myChart.setOption(optionPost)
}

onMounted(() => {
  const chartDom = document.getElementById('pie-main')
  if (chartDom) {
    myChart = echarts.init(chartDom)
    updateChart() // 初始化图表
  }
})

// 监听 props 的变化
watch(() => [props.memId, props.date, props.type], updateChart, {
  immediate: true
})
</script>

<template>
  <div>
    <e-charts id="pie-main" class="chart" :option="optionPost" />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  width: 600px;
  height: 400px;
}
</style>
