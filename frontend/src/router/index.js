import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage/LoginPage.vue'
import MemManage from '@/views/MemManage/MemManage.vue'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LayoutContainer',
      component: () => import('@/views/LayoutContainer/LayoutContainer.vue'),
      redirect: '/data-view',
      children: [
        {
          path: '/data-view',
          name: 'DataView',
          component: () => import('@/views/DataView/DataView.vue')
        },
        {
          path: '/mem-manage',
          name: 'MemManage',
          component: MemManage
        },
        {
          path: '/income',
          name: 'IncomePage',
          component: () => import('@/views/IncomePage/IncomePage.vue')
        },
        {
          path: '/outcome',
          name: 'OutcomePage',
          component: () => import('@/views/OutcomePage/OutcomePage.vue')
        },
        {
          path: '/user-center',
          name: 'UserCenter',
          component: () => import('@/views/UserCenter/UserCenter.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    }
  ],
  // 滚动行为
  scrollBehavior() {
    return { top: 0 }
  }
})
// 前置导航守卫
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.userInfo.token && to.path !== '/login') {
    return '/login'
  }
  return true
})
export default router
