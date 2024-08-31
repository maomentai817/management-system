<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'
// import { useConsumeStore } from '@/stores'

// const consumeStore = useConsumeStore()
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

const dataPost = [
  { value: 1048, name: '后厨清洁工' },
  { value: 735, name: '西式餐饮服务员帮工' },
  { value: 580, name: '宴席服务帮工' },
  { value: 484, name: '宴会服务帮工' },
  { value: 300, name: '礼宾员-门童零工' },
  { value: 300, name: '中餐饮大厅服务帮工' },
  { value: 300, name: '厨房帮工' },
  { value: 300, name: '洗衣房帮工' }
]
const optionPost = {
  title: {
    text: '岗位来源分类',
    bottom: '0',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    // 对图形的解释部分
    orient: 'vertical',
    right: 10,
    y: 'center',
    icon: 'circle',
    formatter: (name) => {
      let total = 0
      let target
      for (let i = 0; i < dataPost.length; i++) {
        total += dataPost[i].value
        if (dataPost[i].name === name) {
          target = dataPost[i].value
        }
      }
      const arr = [
        '{a|' + name + '}',
        '{b|' + target + '}',
        '{c|' + ((target / total) * 100).toFixed(2) + '%}'
      ]
      return arr.join('  ')
    },
    textStyle: {
      padding: [10, 0, 0, 0],
      rich: {
        a: {
          fontSize: 15,
          width: 135
        },
        b: {
          fontSize: 15,
          width: 50
        },
        c: {
          fontSize: 15,
          color: '#c1c1c1'
        }
      }
    }
  },
  series: [
    {
      name: '岗位来源分类',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['25%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: dataPost
    }
  ]
}

// consumeStore.consumeList 获取所有数据, 根据 props.xxx 筛选, 处理数据
console.log(props)

onMounted(() => {
  const chartDom = document.getElementById('pie-main')
  const myChart = echarts.init(chartDom)
  // props.option && myChart.setOption(props.option)
  myChart.setOption(optionPost)
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
