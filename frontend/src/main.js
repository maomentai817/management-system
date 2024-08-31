import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
// 配置封装后 pinia
import pinia from '@/stores'

// 配置中文组件
import ELementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 引入初始化全局样式
// import '@/styles/common.scss'
// 夜间模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入全局组件
import { componentPlugin } from '@/components'
// 引入懒加载指令
import { lazyPlugin } from '@/directives'
// UnoCSS
import 'virtual:uno.css'
// 挂载 echarts
import Echarts from 'vue-echarts'
import 'echarts'

const app = createApp(App)

app.use(router)
app.use(pinia)
// 挂载中文组件
app.use(ELementPlus, {
  locale: zhCn
})
// 挂载全局组件
app.use(componentPlugin)
// 注册自定义插件
app.use(lazyPlugin)

app.component('ECharts', Echarts)

app.mount('#app')
