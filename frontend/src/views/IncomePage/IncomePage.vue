<script setup>
import CardContainer from '@/components/modules/CardContainer/CardContainer.vue'
import { useIncomeData } from './composables/config'
import { useConsumeStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { getFilterIncomeAPI } from '@/api/consume'

const { memOptions, tagOptions } = useIncomeData()

const consumeStore = useConsumeStore()

onMounted(() => {
  if (consumeStore.incomeList.length === 0) consumeStore.getIncomeData()
})
const handleDel = (row) => {
  consumeStore.deleteConsume(row.id)
}

const filterData = ref(consumeStore.incomeList)
const handleFilter = async (info) => {
  const res = await getFilterIncomeAPI(info)
  filterData.value = res.data
}
const handleReset = () => {
  filterData.value = consumeStore.incomeList
  ElNotification({
    message: '重置成功',
    type: 'success',
    duration: 2000
  })
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
        >
        </FilterBox>
      </div>
      <div class="table-container">
        <CardContainer>
          <TableContainer
            :tableData="filterData"
            @del="handleDel"
          ></TableContainer>
        </CardContainer>
      </div>
    </CardContainer>
  </div>
</template>

<style lang="scss" scoped></style>
