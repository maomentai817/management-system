<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import Vcode from 'vue3-puzzle-vcode'
// import imgs from '../composables/getRandomImgs'
import { getRandomPic } from '@/api/global'

let imgs = []
onMounted(async () => {
  const res = await getRandomPic()
  imgs = res.data
})
const userStore = useUserStore()
const form = ref({
  account: '',
  password: ''
})
const defaultRules = {
  account: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 3, max: 14, message: '密码长度应为3-14位', trigger: 'blur' }
  ]
}

const loginRules = {
  ...defaultRules
}

const router = useRouter()
// 表单统一校验
const loginFormRef = ref(null)
const isVerified = ref(false)
const isShowLogin = ref(false)

const onSubmit = () => {
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      isVerified.value = false
      isShowLogin.value = true
    }
  })
}

const onSuccessLogin = () => {
  isVerified.value = true
  isShowLogin.value = false
  setTimeout(() => {
    proceedToLogin()
  }, 500)
}

const proceedToLogin = async () => {
  if (isVerified.value) {
    const { account, password } = form.value
    // 登录操作
    const res = await userStore.getUserInfo({ username: account, password })
    if (res.status === 200) {
      ElMessage.success('登录成功')
      router.replace('/')
    } else {
      ElMessage.error(res.msg)
    }
    // ElMessage.success('登录成功')
    // router.replace('/')
  } else {
    ElMessage.error('请先完成验证')
  }
}
</script>

<template>
  <div>
    <section class="login-section absolute tf-50 wh-300">
      <h1 class="mb-20">Login</h1>
      <div class="account-box">
        <div class="form">
          <Vcode :show="isShowLogin" @success="onSuccessLogin" :imgs="imgs" />
          <el-form
            status-icon
            :model="form"
            :rules="loginRules"
            ref="loginFormRef"
          >
            <el-form-item prop="account">
              <el-input v-model="form.account" placeholder="username" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="password"
                autocomplete="new-password"
              />
            </el-form-item>
            <el-button class="subBtn w-full" @click="onSubmit">登录</el-button>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.login-section {
  margin: -150px 0 0 -150px;
  h1 {
    color: #fff;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    letter-spacing: 1px;
    text-align: center;
  }
  :deep(.el-input__wrapper) {
    background-color: transparent;
    padding: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    outline: none;
    padding: 0 10px;
    font-size: 13px;
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    box-shadow:
      inset 0 -5px 45px rgba(100, 100, 100, 0.2),
      0 1px 1px rgba(255, 255, 255, 0.2);
    input::placeholder {
      color: #999;
    }
  }
  :deep(.el-button) {
    background-color: rgba(255, 255, 255, 0.3);
    color: #999;
  }
}
</style>
