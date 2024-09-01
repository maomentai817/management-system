import { useConsumeStore, useMemberStore } from '@/stores'
export const useAreaConfig = (memId, date, type) => {
  const consumeStore = useConsumeStore()
  const memberStore = useMemberStore()
  let name = ''
  if (memId !== 0 && memId !== '') {
    name = memberStore.members.find((item) => item.memId === memId)?.name
  }
  const direct = memberStore.members.map((item) => {
    return { name: item.name, memId: item.memId }
  })
  const nameDirect = direct.reduce((acc, item) => {
    acc[item.memId] = item.name
    return acc
  }, {})
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
        console.log(timeUnit)
        // 如果 date 是空，则按月份统计，否则按天统计
        const isDateMatch = date === '' || item.consumeDate.slice(0, 7) === date
        if (isDateMatch) {
          // 查找是否已经存在相同 category 和 timeUnit 的数据
          let found = acc.find((entry) => entry.month === timeUnit)

          if (found) {
            found.value += item.amount // 累加 value
          } else {
            acc.unshift({
              name: nameDirect[item.memId],
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
  let seriesData = []
  let months = []
  if (name === '') {
    months = [
      ...new Set(dataList.map((item) => item.consumeDate.slice(0, 7)))
    ].sort()

    // Step 2: 根据memberName进行分组，并按照月份填充数据
    seriesData = Object.values(
      dataList.reduce((acc, { memberName, consumeDate, amount }) => {
        const month = consumeDate.slice(0, 7)
        if (!acc[memberName]) {
          acc[memberName] = {
            name: memberName,
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: { focus: 'series' },
            data: Array(months.length).fill(0) // 初始化为0
          }
        }
        const monthIndex = months.indexOf(month)
        acc[memberName].data[monthIndex] += amount // 叠加金额到对应月份位置
        return acc
      }, {})
    )

    // 输出结果
    console.log(seriesData)
  }
  const titleText = () => {
    if (type === 'all') return `${name} 月度收支趋势`
    if (type === 'income') return `${name} 月度收入趋势`
    return `${name} 月度支出趋势`
  }
  const optionPost = {
    title: {
      text: titleText(),
      bottom: '10',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: name ? areaChartData.map((item) => item.month) : months
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
    series: name
      ? [
          {
            data: areaChartData.map((item) => item.value),
            type: 'line',
            areaStyle: {}
          }
        ]
      : seriesData
  }

  return { optionPost }
}
