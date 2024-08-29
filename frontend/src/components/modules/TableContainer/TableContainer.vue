<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  }
})
const currentPage = ref(1)
const pageSize = ref(5)
const showTableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = currentPage.value * pageSize.value
  return props.tableData.slice(start, end)
})
const handleSizeChange = () => {
  currentPage.value = 1
}
</script>

<template>
  <div class="table-box">
    <div class="table-content">
      <el-table
        :data="showTableData"
        border
        style="width: 100%"
        highlight-current-row="true"
        table-layout="auto"
      >
        <el-table-column align="center" prop="consumeDate" label="日期" />
        <el-table-column align="center" prop="memId" label="成员" />
        <el-table-column align="center" prop="category" label="分类" />
        <el-table-column align="center" prop="amount" label="金额" />
        <el-table-column align="center" prop="recipient" label="来源/去向" />
        <el-table-column align="center" prop="userNote" label="更多描述" />
        <el-table-column align="center" label="操作">
          <template #default>
            <el-button type="primary" plain>编辑</el-button>
            <el-button type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination mt-20">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
