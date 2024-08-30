<script setup>
import CardContainer from '@/components/modules/CardContainer/CardContainer.vue'
import { useIncomeData } from './composables/config'
import { useConsumeStore } from '@/stores'
import { onMounted } from 'vue'

const { memOptions, tagOptions } = useIncomeData()

const consumeStore = useConsumeStore()

// const incomeList = ref(consumeStore.incomeList)
onMounted(() => {
  if (consumeStore.incomeList.length === 0) consumeStore.getIncomeData()
})
const handleDel = (row) => {
  consumeStore.deleteConsume(row.id)
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
        >
        </FilterBox>
      </div>
      <div class="table-container">
        <CardContainer>
          <TableContainer
            :tableData="consumeStore.incomeList"
            @del="handleDel"
          ></TableContainer>
        </CardContainer>
      </div>
    </CardContainer>
  </div>
</template>

<style lang="scss" scoped></style>
