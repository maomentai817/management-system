import { useConsumeStore, useMemberStore } from '@/stores'

export const useStackedBarConfig = (memId, date, type) => {
  const consumeStore = useConsumeStore()
  const memberStore = useMemberStore()
  let dataPre = []
  const dataDeal = (list) => {
    return list.map((item) => {
      return {
        amount: item.amount,
        date: item.consumeDate,
        memId: item.memId,
        name: item.memberName
      }
    })
  }
  if (type === 'all') dataPre = dataDeal(consumeStore.consumeList)
  if (type === 'income') dataPre = dataDeal(consumeStore.incomeList)
  if (type === 'outcome') dataPre = dataDeal(consumeStore.outcomeList)
  const direct = memberStore.members.map((item) => {
    return { name: item.name, memId: item.memId }
  })
  const nameDirect = direct.reduce((acc, item) => {
    acc[item.memId] = item.name
    return acc
  }, {})
  // console.log(Object.values(nameDirect))
  let dimensionsPre = []
  let titleText = ''
  let sourceData = []
  if (!memId && !date) {
    // n 用户月度
    dimensionsPre = ['month', ...Object.values(nameDirect)]
    titleText = `月度${type === 'all' ? '收支' : type === 'income' ? '收入' : '支出'}柱状图`
    // 数据处理
    const result = dataPre.reduce((acc, item) => {
      const month = item.date.slice(0, 7)
      if (!acc[month]) {
        acc[month] = { month }
      }
      if (!acc[month][item.name]) {
        acc[month][item.name] = 0
      }
      acc[month][item.name] += item.amount
      return acc
    }, {})

    sourceData = Object.values(result).sort(
      (a, b) => new Date(a.month) - new Date(b.month)
    )
    console.log('sourceData: ', sourceData)
  } else if (!memId && date) {
    // n 用户当月
    dimensionsPre = ['day', ...Object.values(nameDirect)]
    titleText = `${date} ${type === 'all' ? '收支' : type === 'income' ? '收入' : '支出'}柱状图`
    // 数据处理
    const processByDay = (data, filterDate) => {
      const result = data.reduce((acc, item) => {
        const [year, month, day] = item.date.split('-')
        const formattedDay = `${month}-${day}` // 'MM-DD' format

        if (`${year}-${month}` === filterDate) {
          // Match the year and month
          let dayObj = acc.find((entry) => entry.day === formattedDay)
          if (!dayObj) {
            dayObj = { day: formattedDay }
            acc.push(dayObj)
          }
          if (!dayObj[item.name]) {
            dayObj[item.name] = 0
          }
          dayObj[item.name] += item.amount
        }

        return acc
      }, [])

      return result.sort(
        (a, b) => new Date(`2024-${a.day}`) - new Date(`2024-${b.day}`)
      )
    }

    sourceData = processByDay(dataPre, date)
  } else if (memId && !date) {
    // 1 用户月度
    dimensionsPre = ['month', nameDirect[memId]]
    titleText = `${nameDirect[memId]} ${type === 'all' ? '收支' : type === 'income' ? '收入' : '支出'}柱状图`
    // 数据处理
    const filterByMemId = (data, memId) => {
      const result = data.reduce((acc, item) => {
        if (item.memId === memId) {
          // 根据传入的memId筛选数据
          const month = item.date.slice(0, 7)
          if (!acc[month]) {
            acc[month] = { month, [item.name]: 0 }
          }
          acc[month][item.name] += item.amount
        }
        return acc
      }, {})
      return Object.values(result).sort(
        (a, b) => new Date(a.month) - new Date(b.month)
      )
    }
    sourceData = filterByMemId(dataPre, memId)
  } else if (memId && date) {
    // 1 用户当月
    dimensionsPre = ['day', nameDirect[memId]]
    titleText = `${nameDirect[memId]} ${date} ${type === 'all' ? '收支' : type === 'income' ? '收入' : '支出'}柱状图`
    // 数据处理
    const processByDayAndMemId = (data, filterDate, memId) => {
      const result = data.reduce((acc, item) => {
        const [year, month, day] = item.date.split('-')
        const formattedDay = `${month}-${day}` // 'MM-DD' format

        if (`${year}-${month}` === filterDate && item.memId === memId) {
          let dayObj = acc.find((entry) => entry.day === formattedDay)
          if (!dayObj) {
            dayObj = { day: formattedDay }
            acc.push(dayObj)
          }
          dayObj[item.name] = item.amount
        }

        return acc
      }, [])

      return result.sort(
        (a, b) => new Date(`2024-${a.day}`) - new Date(`2024-${b.day}`)
      )
    }
    sourceData = processByDayAndMemId(dataPre, date, memId)
  }

  console.log(sourceData)
  console.log(dimensionsPre)
  const optionPost = {
    legend: {},
    tooltip: {},
    title: {
      text: titleText,
      bottom: '10',
      left: 'center'
    },
    dataset: {
      dimensions: dimensionsPre,
      source: sourceData
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: Array.from({ length: dimensionsPre.length - 1 }, () => ({
      type: 'bar'
    }))
  }

  return { optionPost }
}
