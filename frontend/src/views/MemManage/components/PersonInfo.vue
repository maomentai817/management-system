<script setup>
import { Plus } from '@element-plus/icons-vue'
import { useMemberStore } from '@/stores'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  personInfo: {
    type: Object,
    default: () => {}
  }
})

const memberStore = useMemberStore()
const dialogVisible = ref(false)
const form = ref({
  name: '',
  sex: '男'
})
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
  ]
}
const formRef = ref(null)
const dialogConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(form.value)
      memberStore.addMember(form.value)
      dialogVisible.value = false
    }
  })
}
const router = useRouter()
const navigateToDataV = () => {
  router.push(`/data-view?id=${props.personInfo.memId}`)
}
</script>

<template>
  <CardContainer
    class="wh-full overflow-hidden cursor-pointer"
    id="per-card"
    @click="navigateToDataV"
  >
    <div class="per-content fd-col f-c" v-if="personInfo">
      <div class="per-avatar bg-red w-90% relative overflow-hidden">
        <UglyAvatar></UglyAvatar>
      </div>
      <div class="per-info m-t-12 fs-20">
        {{ personInfo.name }}
      </div>
    </div>
    <div class="per-content f-c h-full" v-else @click="dialogVisible = true">
      <el-icon class="fs-28 color-#8c939d text-center wh-100%">
        <Plus></Plus>
      </el-icon>
    </div>
  </CardContainer>
  <el-dialog v-model="dialogVisible" title="添加成员" width="30%">
    <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogConfirm">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped>
#per-card {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:hover {
    box-shadow:
      0 0 10px 0 rgba(39, 186, 155, 0.5),
      0 0 25px 0 rgba(39, 186, 155, 0.5);
  }
  .per-avatar {
    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }
    & > * {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
