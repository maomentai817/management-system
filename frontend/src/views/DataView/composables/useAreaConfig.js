import { useConsumeStore, useMemberStore } from '@/stores'
export const useAreaConfig = (memId, date, type) => {
  const consumeStore = useConsumeStore()
  const memberStore = useMemberStore()
  let name = ''
  if (memId !== 0 && memId !== '') {
    name = memberStore.members.find((item) => item.memId === memId)?.name
  }
  let dataList = []
  if (type === 'income') {
    dataList = consumeStore.incomeList
  } else if (type === 'outcome') {
    dataList = consumeStore.outcomeList
  } else {
    dataList = consumeStore.consumeList
  }
  const processDataForAreaChart = (list, date) => {
    const result = list.reduce((acc, item) => {
      // 检查 memId 是否匹配
      const isMemIdMatch = item.memId === memId || memId === '' || memId === 0

      if (isMemIdMatch) {
        // 判断是否根据日期筛选
        const timeUnit = date?.length
          ? item.consumeDate
          : item.consumeDate.slice(0, 7) // 获取年月或完整日期
        // 如果 date 是空，则按月份统计，否则按天统计
        const isDateMatch = date === '' || item.consumeDate.slice(0, 7) === date
        if (isDateMatch) {
          // 查找是否已经存在相同 category 和 timeUnit 的数据
          let found = acc.find((entry) => entry.month === timeUnit)

          if (found) {
            found.value += item.amount // 累加 value
          } else {
            acc.unshift({
              month: timeUnit,
              value: item.amount
            }) // 添加新项
          }
        }
      }

      return acc
    }, [])

    return result
  }

  // 获取去重后的数据
  const areaChartData = processDataForAreaChart(dataList, date)
  if (date.length) {
    areaChartData.forEach((item) => {
      item.month = item.month.slice(5, 10)
    })
  }
  console.log(name)
  const optionPost = {
    title: {
      text: `${name} 月度收支趋势图`,
      bottom: '10',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: areaChartData.map((item) => item.month)
    },
    yAxis: {
      type: 'value'
    },
    color: [
      '#b7eb8f',
      '#95de64',
      '#73d13d',
      '#52c41a',
      '#389e0d',
      '#237804',
      '#135200'
    ],
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        data: areaChartData.map((item) => item.value),
        type: 'line',
        areaStyle: {}
      }
    ]
  }

  return { optionPost }
}
