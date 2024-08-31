<script setup>
import { useRoute } from 'vue-router'
import AreaChart from './components/AreaChart/AreaChart.vue'
import BarChart from './components/BarChart/BarChart.vue'
import HeatMap from './components/HeatMap/HeatMap.vue'
import LineChart from './components/LineChart/LineChart.vue'
import PieChart from './components/PieChart/PieChart.vue'
import RadarChart from './components/RadarChart/RadarChart.vue'
import SankeyDiagram from './components/SankeyDiagram/SankeyDiagram.vue'
import ScatterPlot from './components/ScatterPlot/ScatterPlot.vue'
import StackedBar from './components/StackedBar/StackedBar.vue'

const route = useRoute()
console.log(route.query.id)
</script>

<template>
  <div class="data-v-container wh-full f-s flex-wrap">
    <CardContainer class="chart-card">
      <PieChart></PieChart>
    </CardContainer>
    <CardContainer class="chart-card">
      <BarChart></BarChart>
    </CardContainer>
    <CardContainer class="chart-card">
      <LineChart></LineChart>
    </CardContainer>
    <CardContainer class="chart-card">
      <ScatterPlot></ScatterPlot>
    </CardContainer>
    <CardContainer class="chart-card">
      <AreaChart></AreaChart>
    </CardContainer>
    <CardContainer class="chart-card">
      <RadarChart></RadarChart>
    </CardContainer>
    <CardContainer class="chart-card">
      <StackedBar></StackedBar>
    </CardContainer>
    <CardContainer class="chart-card">
      <HeatMap></HeatMap>
    </CardContainer>
    <CardContainer class="chart-card">
      <SankeyDiagram></SankeyDiagram>
    </CardContainer>
  </div>
</template>

<style lang="scss" scoped>
.chart-card {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
