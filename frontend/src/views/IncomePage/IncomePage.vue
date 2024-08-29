<script setup>
import CardContainer from '@/components/modules/CardContainer/CardContainer.vue'
import { useIncomeData } from './composables/config'

const { memOptions, tagOptions } = useIncomeData()
</script>

<template>
  <div class="income-container h-full">
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
          <TableContainer></TableContainer>
        </CardContainer>
      </div>
    </CardContainer>
  </div>
</template>

<style lang="scss" scoped></style>
