
import { useConsumeStore } from '@/stores'

export const useScatterConfig = (memId, date, type) => {
  const consumeStore = useConsumeStore()

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

  const filterData = dataPre.filter((item) => {
    let memIdMatch = true
    let dateMatch = true
    if (memId) {
      memIdMatch = item.memId === memId
    }
    if (date) {
      const itemMonth = item.date.slice(0, 7)
      const filterMonth = date
      dateMatch = itemMonth === filterMonth
    }
    return memIdMatch && dateMatch
  })

  const processData = (list) => {
    const seriesData = []
    const groupedData = {}

    const legend = [...new Set(list.map((item) => item.name))]

    for (const item of list) {
      const { name, date, amount } = item


      if (!groupedData[name]) {
        groupedData[name] = {}
      }

      if (!groupedData[name][date]) {
        groupedData[name][date] = 0
      }

      groupedData[name][date] += amount
    }

    for (const name in groupedData) {
      const data = []

      for (const date in groupedData[name]) {
        data.push([date, groupedData[name][date]])
      }

      seriesData.push({
        name: name,
        type: 'scatter',
        emphasis: {
          focus: 'series'
        },
        // prettier-ignore
        data: data,
        markArea: {
          silent: true,
          itemStyle: {
            color: 'transparent',
            borderWidth: 1,
            borderType: 'dashed'
          },
          data: [
            [
              {
                name: `${name} Data Range`,
                xAxis: 'min',
                yAxis: 'min'
              },
              {
                xAxis: 'max',
                yAxis: 'max'
              }
            ]
          ]
        },
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          lineStyle: {
            type: 'solid'
          },
          data: [{ type: 'average', name: 'AVG' }, { xAxis: 160 }]
        }
      })
    }

    return { legend, seriesData }
  }

  const { legend, seriesData } = processData(filterData)


  const optionPost = {
    title: {
      text: '收支日期图',
      bottom: '10',
      left: 'center'

    },
    grid: {
      left: '3%',
      right: '7%',
      bottom: '15%',
      containLabel: true
    },
    tooltip: {
      // trigger: 'axis',
      showDelay: 0,
      formatter: function (params) {
        if (params.value.length > 1) {
          return (
            params.seriesName +
            ' :<br/>' +
            params.value[0] +
            ' ' +
            params.value[1] +
            '￥ '
          )
        } else {
          return (
            params.seriesName +
            ' :<br/>' +
            params.name +
            ' : ' +
            params.value +
            '￥ '
          )
        }
      },
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 1
        }
      }
    },

    legend: {
      data: legend,
      left: 'center',
      top: 'auto'
    },
    xAxis: [
      {
        type: 'time',
        // scale: true,
        axisLabel: {
          formatter: date
            ? '{MM}-{dd}'
            : function (value) {
                const date = new Date(value)
                const year = date.getFullYear()
                const month = (date.getMonth() + 1).toString().padStart(2, '0')
                const day = date.getDate()

                // 只显示每个月的第一个日期
                return day === 1 ? `${year}-${month}` : ''
              }

        },
        splitLine: {
          show: false
        }

      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        axisLabel: {
          formatter: '{value} ￥'
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: seriesData
  }
  return { optionPost }
}
