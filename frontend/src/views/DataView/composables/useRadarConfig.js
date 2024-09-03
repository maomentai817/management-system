import { useConsumeStore, useMemberStore } from '@/stores'
import config from './config'
export const useRadarConfig = (memId, date, type) => {
  const consumeStore = useConsumeStore()
  const memberStore = useMemberStore()
  let name = ''

  if (memId !== 0 && memId !== '') {
    name = memberStore.members.find((item) => item.memId === memId)?.name
  }

  let dataList
  if (type == 'income') {
    dataList = consumeStore.incomeList
  } else if (type == 'outcome') {
    dataList = consumeStore.outcomeList
  } else {
    dataList = consumeStore.consumeList
  }

  const filterData = dataList.filter((item) => {
    let memIdMatch = true
    let dateMatch = true
    if (memId) {
      memIdMatch = item.memId === memId
    }
    if (date) {
      const itemMonth = item.consumeDate.slice(0, 7)
      const filterMonth = date
      dateMatch = itemMonth === filterMonth
    }
    return memIdMatch && dateMatch
  })

  const processData = (list) => {
    //获取所有不同membername
    const legend = [...new Set(list.map((item) => item.memberName))]

    //获取所有不同category
    const categories = [...new Set(list.map((item) => item.category))]

    //初始化indicatorsData
    const indicatorsData = categories.map((category) => {
      return {
        name: category,
        max: 0
      }
    })

    //初始化seriesData
    const seriesData = legend.map((member) => {
      return {
        name: member,
        value: new Array(categories.length).fill(0)
      }
    })

    let globalMax = 0

    list.forEach((item) => {
      const categoryIndex = categories.indexOf(item.category)
      const memberIndex = legend.indexOf(item.memberName)

      if (categoryIndex !== -1 && memberIndex !== -1) {
        indicatorsData[categoryIndex].max += item.amount
        seriesData[memberIndex].value[categoryIndex] += item.amount
        globalMax = Math.max(
          globalMax,
          seriesData[memberIndex].value[categoryIndex]
        )
      }
    })

    indicatorsData.forEach((indicator) => {
      indicator.max = globalMax
    })

    return { legend, indicatorsData, seriesData }
  }

  const { legend, indicatorsData, seriesData } = processData(filterData)
  const optionPost = {
    title: {
      text: `${name}收支类型`,
      bottom: '10',
      left: 'center'
    },
    legend: {
      data: legend
      //   ['Allocated Budget', 'Actual Spending']
    },
    radar: {
      radius: '60%',
      indicator: indicatorsData
    },
    color: config.color[type],
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: seriesData
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        // 自定义 tooltip 内容的格式，两列布局
        let result = `<div style="display: flex; flex-wrap: wrap; width: 12vw">`
        result += `
        <div style="font-weight:600; width: 100%; text-align: left; font-weight: bold; padding-bottom: 4px;">
          ${params.name}
        </div>`
        // 遍历每个指标及其对应的值
        params.value.forEach((value, index) => {
          result += `
            <div style="flex: 1 1 50%; box-sizing: border-box; font-size: 12px">
              <strong>${indicatorsData[index].name}</strong>: ${value}
            </div>`
        })

        result += `</div>`
        return result
      },

      position: ['60%', '15%']
    }
  }

  return { optionPost }
}
