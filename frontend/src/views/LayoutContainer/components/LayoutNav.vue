<script setup>
import { Fold, Expand, Platform, FullScreen } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useGlobalStore } from '@/stores'
import SwitchButton from '@/components/modules/SwitchButton/SwitchButton.vue'
import avatarImg from '@/assets/images/qianxun.jpg'

const globalStore = useGlobalStore()
const router = useRouter()
const goHome = () => {
  router.push('/data-view')
}
const toggleCollapse = () => {
  globalStore.setCollapse(!globalStore.isCollapse)
  console.log(1)
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
</script>

<template>
  <div class="nav-container f-b h-full">
    <div class="left-content f-c h-full">
      <IconCube
        @click="toggleCollapse"
        :label="!globalStore.isCollapse ? '折叠菜单' : '展开菜单'"
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
        <IconCube :label="isFullScreen ? '退出全屏' : '全屏'">
          <FullScreen />
        </IconCube>
      </div>
      <div class="locale"></div>
      <div class="dark-mode m-x-15 f-c">
        <SwitchButton />
      </div>
      <div class="user-container f-c p-x-10 p-y-4 cursor-pointer">
        <div class="avatar-container mr-6 f-c">
          <el-avatar :src="avatarImg" />
        </div>
        <div class="username-container">猫闷台817</div>
      </div>
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
</style>
