import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import router from '@/router'

const baseURL = 'http://localhost:8088/'
// const baseURL = 'http://192.168.43.59:8088/'

const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 请求前操作
    // TODO: 添加token / 设置请求头
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    // 错误处理
    return Promise.reject(err)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO: 业务处理失败操作
    if (res.status !== 200) {
      return Promise.reject(new Error(res.statusText))
    }
    // TODO: 摘取核心响应数据
    return res.data
  },
  (err) => {
    console.log(err)
    ElMessage({
      type: 'warning',
      // message: err.response.data.message || '服务异常'
      message: err.message || '服务异常'
    })
    // TODO: 处理 401 错误 -- token 失效
    if (err.response && err.response.status === 401) {
      // TODO: 跳转登录页
      // TODO: 清除token
      const userStore = useUserStore()
      userStore.clearUserInfo()
      router.push('/login')
    }
    return Promise.reject(err)
  }
)
export default instance
export { baseURL }
