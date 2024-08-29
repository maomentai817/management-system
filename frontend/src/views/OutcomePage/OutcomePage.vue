<script setup>
import CardContainer from '@/components/modules/CardContainer/CardContainer.vue'
import { useOutcomeData } from './composables/config'
import { onMounted } from 'vue'
import { useConsumeStore } from '@/stores'

const { memOptions, tagOptions } = useOutcomeData()
const consumeStore = useConsumeStore()
onMounted(() => {
  // 获取支出
  consumeStore.getOutcomeData()
})
</script>

<template>
  <div class="outcome-container h-full">
    <CardContainer class="h-full fd-col">
      <div class="filter-container mb-10">
        <FilterBox
          type="true"
          :memOptions="memOptions"
          :tagOptions="tagOptions"
        >
        </FilterBox>
      </div>
      <div class="table-container">
        <CardContainer>
          <TableContainer
            :tableData="consumeStore.outcomeList"
          ></TableContainer>
        </CardContainer>
      </div>
    </CardContainer>
  </div>
</template>

<style lang="scss" scoped></style>
