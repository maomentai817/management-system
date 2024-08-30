<script setup>
import CardContainer from '@/components/modules/CardContainer/CardContainer.vue'
import { useOutcomeData } from './composables/config'
import { useConsumeStore } from '@/stores'
import { onMounted } from 'vue'

const { memOptions, tagOptions } = useOutcomeData()
const consumeStore = useConsumeStore()
onMounted(() => {
  if (consumeStore.outcomeList.length === 0) consumeStore.getOutcomeData()
})
const handleDel = (row) => {
  consumeStore.deleteConsume(row.id)
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
        >
        </FilterBox>
      </div>
      <div class="table-container">
        <CardContainer>
          <TableContainer
            :tableData="consumeStore.outcomeList"
            @del="handleDel"
          ></TableContainer>
        </CardContainer>
      </div>
    </CardContainer>
  </div>
</template>

<style lang="scss" scoped></style>
