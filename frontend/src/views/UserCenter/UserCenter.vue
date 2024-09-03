<script setup>
import { useUserStore } from '@/stores'
import avatarImg from '@/assets/images/qianxun.jpg'
import { ref, watch, onMounted } from 'vue'

const userStore = useUserStore()
const name = ref('')
const nameDeal = (username) => {
  return username
    ?.split('')
    ?.map(
      (c, i) =>
        `<span style="z-index: ${username.length - i}">${c.toUpperCase()}</span>`
    )
    .join('')
}
onMounted(() => {
  name.value = nameDeal(userStore.userInfo.username)
  // console.log(name.value)
})
watch(
  () => userStore.userInfo.username,
  (newValue) => {
    name.value = nameDeal(newValue)
  }
)

const baseStr = ref('')
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // 当文件读取完成时触发
    reader.onload = () => {
      resolve(reader.result)
    }
    // 当文件读取出错时触发
    reader.onerror = (error) => {
      reject(error)
    }
    // 将文件读取为 Data URL (base64)
    reader.readAsDataURL(file)
  })
}
const beforeAvatarUpload = async (e) => {
  baseStr.value = await convertToBase64(e)
  userStore.updateAvatar(baseStr.value, userStore.userInfo.username)
  ElMessage.success('头像修改成功')
}

const dialogVisible = ref(false)
const form = ref({
  name: ''
})
const rules = {
  name: [
    { required: true, message: '请输入新用户名', trigger: 'blur' },
    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
  ]
}
const formRef = ref(null)
const dialogClose = () => {
  dialogVisible.value = false
  form.value.name = ''
}
const updateUsername = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      userStore.updateUsername(userStore.userInfo.username, form.value.name)
      dialogVisible.value = false
    }
  })
}
</script>

<template>
  <div class="income-container h-full">
    <CardContainer class="h-full f-c">
      <div class="userinfo-box h-full w-50vw">
        <div class="avatar-container h-75% f-c">
          <div class="avatar-content cursor-pointer">
            <el-upload
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
            >
              <el-avatar
                round
                :size="300"
                :fit="fit"
                :src="userStore.userInfo.avatar || avatarImg"
              />
            </el-upload>
          </div>
        </div>
        <div
          class="username-container f-c fs-70 color-#27ba9b fw-600 w-full cursor-pointer"
          @click="dialogVisible = true"
          v-html="name"
        ></div>
      </div>
    </CardContainer>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="修改用户名"
    width="500"
    @close="dialogClose"
  >
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="新用户名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogClose">取消</el-button>
        <el-button type="primary" @click="updateUsername"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.avatar-content {
  border-radius: 50%;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow:
      0 0 10px 0 rgba(39, 186, 155, 0.5),
      0 0 25px 0 rgba(39, 186, 155, 0.5);
  }
}
.username-container {
  font-family: 'Luckiest Guy';
  transform: translateY(-1rem);
  text-shadow: 5px 0 15px #d9f7be;
}
</style>
