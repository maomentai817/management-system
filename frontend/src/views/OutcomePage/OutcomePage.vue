<script setup>
import CardContainer from '@/components/modules/CardContainer/CardContainer.vue'
import { useOutcomeData } from './composables/config'
import { useConsumeStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { getFilterOutcomeAPI } from '@/api/consume'

const { memOptions, tagOptions } = useOutcomeData()

const consumeStore = useConsumeStore()

onMounted(() => {
  if (consumeStore.outcomeList.length === 0) consumeStore.getOutcomeData()
})
const handleDel = (row) => {
  consumeStore.deleteConsume(row.id)
}
const filterData = ref(consumeStore.outcomeList)
const handleFilter = async (info) => {
  const res = await getFilterOutcomeAPI(info)
  filterData.value = res.data
}
const handleReset = () => {
  filterData.value = consumeStore.outcomeList
  ElNotification({
    message: '重置成功',
    type: 'success',
    duration: 2000
  })
}
</script>

<template>
  <div class="outcome-container h-full">
    <CardContainer class="h-full fd-col">
      <div class="filter-container mb-10">
        <FilterBox
          :type="false"
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
