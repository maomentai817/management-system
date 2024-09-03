<script setup>
import { useRoute, useRouter } from 'vue-router'
import AreaChart from './components/AreaChart/AreaChart.vue'
// import HeatMap from './components/HeatMap/HeatMap.vue'
import PieChart from './components/PieChart/PieChart.vue'
import RadarChart from './components/RadarChart/RadarChart.vue'
import ScatterPlot from './components/ScatterPlot/ScatterPlot.vue'
import StackedBar from './components/StackedBar/StackedBar.vue'
import FilterNav from './components/FilterNav/FilterNav.vue'
import { ref } from 'vue'
import { useAiStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const aiStore = useAiStore()
// console.log(route.query.id, typeof route.query.id)

const memId = ref(~~route.query.id || 0)
const date = ref('')
const type = ref('all')

const handleReset = () => {
  // 重置
  memId.value = 0
  date.value = ''
  type.value = 'all'
  ElNotification({
    message: '重置成功',
    type: 'success',
    duration: 2000
  })
}

const handleFilter = (info) => {
  // console.log(info)
  memId.value = info.memVal
  date.value = info.date
  type.value = info.type
}

const handleAnalyze = async (info) => {
  await aiStore.clearMessage()
  aiStore.insertMessage('user', info.message)
  router.push(
    `/ai-chat?memId=${info.memId}&date=${info.date}&type=${info.type}`
  )
}
</script>

<template>
  <div class="data-v-container wh-full fd-col">
    <div class="filter-container">
      <FilterNav
        @reset="handleReset"
        @filter="handleFilter"
        @analyze="handleAnalyze"
        :mem-id="memId"
      ></FilterNav>
    </div>
    <div class="data-v-content f-s flex-wrap mt-15">
      <CardContainer class="chart-card">
        <PieChart :mem-id="memId" :date="date" :type="type"></PieChart>
      </CardContainer>
      <CardContainer class="chart-card">
        <ScatterPlot :mem-id="memId" :date="date" :type="type"></ScatterPlot>
      </CardContainer>
      <CardContainer class="chart-card">
        <AreaChart :mem-id="memId" :date="date" :type="type"></AreaChart>
      </CardContainer>
      <CardContainer class="chart-card">
        <RadarChart :mem-id="memId" :date="date" :type="type"></RadarChart>
      </CardContainer>
      <CardContainer class="chart-card">
        <StackedBar :mem-id="memId" :date="date" :type="type"></StackedBar>
      </CardContainer>
      <!-- <CardContainer class="chart-card">
        <HeatMap :mem-id="memId" :date="date" :type="type"></HeatMap>
      </CardContainer> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-card {
  margin-right: 10px;
  margin-bottom: 10px;
  width: 41vw;
  height: 60vh;
  :deep(.el-card__body) {
    padding: 0 !important;
    .content {
      overflow: hidden !important;
      &::-webkit-scrollbar {
        display: none !important;
      }
    }
  }
}
</style>
