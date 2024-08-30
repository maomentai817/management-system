<script setup>
import { ref, computed, markRaw } from 'vue'
import { Delete } from '@element-plus/icons-vue'
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
  return props.tableData?.slice(start, end)
})
const handleSizeChange = () => {
  currentPage.value = 1
}

const emits = defineEmits(['del', 'edit'])
const delHandle = (row) => {
  // console.log('删除', row.id)
  ElMessageBox.confirm('确认删除该条记录吗?', '提示', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning',
    icon: markRaw(Delete),
    center: true
  }).then(() => {
    emits('del', row)
  })
}
const editHandle = (row) => {
  // console.log('编辑', row.id)
  emits('edit', row)
}
</script>

<template>
  <div class="table-box">
    <div class="table-content">
      <el-table
        :data="showTableData"
        border
        style="width: 100%"
        table-layout="auto"
      >
        <el-table-column align="center" prop="consumeDate" label="日期" />
        <el-table-column align="center" prop="memberName" label="成员" />
        <el-table-column align="center" prop="category" label="分类" />
        <el-table-column align="center" prop="amount" label="金额" />
        <el-table-column align="center" prop="recipient" label="来源/去向" />
        <el-table-column align="center" prop="userNote" label="更多描述" />
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              plain
              @click.prevent="editHandle(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" plain @click.prevent="delHandle(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination mt-20">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
