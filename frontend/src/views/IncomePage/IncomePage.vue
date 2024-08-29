<script setup>
import CardContainer from '@/components/modules/CardContainer/CardContainer.vue'
import { useMemberStore } from '@/stores'

const memberStore = useMemberStore()
// const consumeStore = useConsumeStore()

const memOptions = memberStore.members.map((item) => {
  return {
    value: item.memId,
    label: item.name
  }
})
const tagOptions = [
  {
    value: '工资',
    label: '工资'
  },
  {
    value: '奖金',
    label: '奖金'
  },
  {
    value: '其他',
    label: '其他'
  }
]
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
