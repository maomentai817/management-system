<script setup>
import CardContainer from '@/components/modules/CardContainer/CardContainer.vue'
import { useIncomeData } from './composables/config'
import { useConsumeStore } from '@/stores'
import { onMounted, ref, watch, computed } from 'vue'
import { getFilterIncomeAPI } from '@/api/consume'
import Papa from 'papaparse'

const { memOptions, tagOptions } = useIncomeData()

const consumeStore = useConsumeStore()

const filterData = ref(consumeStore.incomeList)
const filterFlag = ref(false)

const sumData = computed(() => {
  return filterData.value.reduce((pre, cur) => {
    return pre + cur.amount
  }, 0)
})

onMounted(() => {
  if (consumeStore.incomeList.length === 0) consumeStore.getIncomeData()
})
watch(
  () => consumeStore.incomeList,
  (newVal) => {
    filterData.value = newVal
    filterFlag.value = false
    handleReset()
  }
)
const handleDel = (row) => {
  // console.log(row)
  consumeStore.deleteConsume(row.id)
}
const drawerData = ref({})
const drawerType = ref('add')
const drawerId = ref(0)
const handleEdit = (row) => {
  drawer.value = true
  drawerType.value = 'edit'
  drawerId.value = row.id
  // console.log(row)
  drawerData.value = {
    recipient: row.recipient,
    category: row.category,
    memberName: row.memberName,
    amount: row.amount,
    consumeDate: row.consumeDate,
    userNote: row.userNote
  }
}

const handleFilter = async (info) => {
  const res = await getFilterIncomeAPI(info)
  filterData.value = res.data
  filterFlag.value = true
}
const handleReset = () => {
  filterData.value = consumeStore.incomeList
  filterFlag.value = false
  ElNotification({
    message: '重置成功',
    type: 'success',
    duration: 2000
  })
}
const drawer = ref(false)
const handleAdd = () => {
  drawerType.value = 'add'
  drawerData.value = {}
  drawer.value = true
}
const handleClose = () => {
  drawer.value = false
}

const exportCSVIncome = (type) => {
  if (type === 'outcome') return
  const csvData = filterData.value.map((row) => ({
    交易时间: row.consumeDate,
    交易类型: row.category,
    交易金额: row.amount,
    所属成员: row.memberName,
    '收/支': '收入',
    '来源/去向': row.recipient,
    备注: row.userNote
  }))
  csvData.unshift({
    交易时间: `导出时间: ${new Date().toLocaleString()}`,
    交易类型: '',
    交易金额: '',
    所属成员: '',
    '收/支': '',
    '来源/去向': '',
    备注: ''
  })
  csvData.unshift({
    交易时间: '----------------------支付账单明细列表--------------------',
    交易类型: '',
    交易金额: '',
    所属成员: '',
    '收/支': '',
    '来源/去向': '',
    备注: ''
  })
  const csv = Papa.unparse(csvData)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', 'table-data.csv')
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div class="income-container h-full">
    <CardContainer class="h-full fd-col">
      <div class="filter-container mb-10">
        <FilterBox
          :type="true"
          :memOptions="memOptions"
          :tagOptions="tagOptions"
          @filter="handleFilter"
          @reset="handleReset"
          @add="handleAdd"
        >
        </FilterBox>
      </div>
      <div class="statistic-container mb-10">
        <StatisticContainer :data="sumData" @export="exportCSVIncome">
        </StatisticContainer>
      </div>
      <div class="table-container">
        <CardContainer>
          <TableContainer
            :tableData="
              filterData.length === 0 && !filterFlag
                ? consumeStore.incomeList
                : filterData
            "
            @del="handleDel"
            @edit="handleEdit"
          ></TableContainer>
        </CardContainer>
      </div>
    </CardContainer>
    <DrawerContainer
      :isShow="drawer"
      @close="handleClose"
      :type="drawerType"
      :renderData="drawerData"
      :id="drawerId"
    ></DrawerContainer>
  </div>
</template>

<style lang="scss" scoped></style>
