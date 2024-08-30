<script setup>
import {
  Fold,
  Expand,
  Platform,
  FullScreen,
  UserFilled,
  SwitchButton as SwitchButton1,
  WarningFilled
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ref, markRaw } from 'vue'
import { useGlobalStore, useUserStore } from '@/stores'
import SwitchButton from '@/components/modules/SwitchButton/SwitchButton.vue'
import avatarImg from '@/assets/images/qianxun.jpg'

const globalStore = useGlobalStore()
const userStore = useUserStore()
const router = useRouter()
const goHome = () => {
  router.push('/data-view')
}
const toggleCollapse = () => {
  globalStore.setCollapse(!globalStore.isCollapse)
}

const isFullScreen = ref(false)
const toggleFullScreen = () => {
  const element = document.documentElement

  if (!isFullScreen.value) {
    // 进入全屏模式
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
  } else {
    // 退出全屏模式
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }
  isFullScreen.value = !isFullScreen.value
}

const navigateToUserCenter = () => {
  router.push('/user-center')
}
const darkBtn = ref(null)
const logout = () => {
  ElMessageBox.confirm('是否确认退出登录?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    icon: markRaw(WarningFilled)
  }).then(() => {
    // 清除 dark-mode
    if (globalStore.isDark) {
      darkBtn.value.triggerClick()
    }
    userStore.clearUserInfo()
    globalStore.localStorageClear()
    setTimeout(() => {
      router.replace('/login')
      ElMessage.success('退出成功')
    }, 1000)
  })
}
</script>

<template>
  <div class="nav-container f-b h-full">
    <div class="left-content f-c h-full">
      <IconCube
        @click="toggleCollapse"
        :label="!globalStore.isCollapse ? '折叠菜单' : '展开菜单'"
        :isDark="globalStore.isDark"
      >
        <Fold v-if="!globalStore.isCollapse" />
        <Expand v-else />
      </IconCube>
      <div class="home ml-18 f-b cursor-pointer" @click="goHome">
        <div class="icon-box f-c">
          <el-icon size="20"><Platform /></el-icon>
        </div>
        <div class="text-box ml-5 mb-2">首页</div>
      </div>
    </div>
    <div class="right-content f-c mr-20">
      <div class="full-screen f-c" @click="toggleFullScreen">
        <IconCube
          :label="isFullScreen ? '退出全屏' : '全屏'"
          :isDark="globalStore.isDark"
        >
          <FullScreen />
        </IconCube>
      </div>
      <div class="locale"></div>
      <div class="dark-mode m-x-15 f-c">
        <SwitchButton ref="darkBtn" />
      </div>
      <el-dropdown size="large" type="primary" trigger="click">
        <div
          class="user-container f-c p-x-10 p-y-4 cursor-pointer"
          :class="globalStore.isDark ? 'dark' : ''"
        >
          <div class="avatar-container mr-6 f-c">
            <el-avatar :src="userStore.userInfo.avatar || avatarImg" />
          </div>
          <div class="username-container">
            {{ userStore.userInfo.username }}
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="navigateToUserCenter">
              <el-icon><UserFilled /></el-icon>
              <span class="ml-4">用户中心</span>
            </el-dropdown-item>
            <el-dropdown-item @click="logout">
              <el-icon><SwitchButton1 /></el-icon>
              <span class="ml-4">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-container {
  &:hover {
    background-color: #2e333817;
    transition-duration: 500ms;
    border-radius: 8px;
  }
}
.dark {
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
}
</style>
