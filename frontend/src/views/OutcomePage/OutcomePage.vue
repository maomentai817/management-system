<script setup>
import CardContainer from '@/components/modules/CardContainer/CardContainer.vue'
import { useOutcomeData } from './composables/config'
import { useConsumeStore } from '@/stores'
import { onMounted, ref, watch } from 'vue'
import { getFilterOutcomeAPI } from '@/api/consume'

const { memOptions, tagOptions } = useOutcomeData()

const consumeStore = useConsumeStore()

const filterData = ref(consumeStore.outcomeList)
const filterFlag = ref(false)

onMounted(() => {
  if (consumeStore.outcomeList.length === 0) consumeStore.getOutcomeData()
})
watch(
  () => consumeStore.outcomeList,
  (newVal) => {
    filterData.value = newVal
    filterFlag.value = false
    handleReset()
  }
)
const handleDel = (row) => {
  consumeStore.deleteConsume(row.id)
}

// 抽屉
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
  const res = await getFilterOutcomeAPI(info)
  filterData.value = res.data
  filterFlag.value = true
}
const handleReset = () => {
  filterData.value = consumeStore.outcomeList
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
          @add="handleAdd"
        >
        </FilterBox>
      </div>
      <div class="table-container">
        <CardContainer>
          <TableContainer
            :tableData="
              filterData.length === 0 && !filterFlag
                ? consumeStore.outcomeList
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
