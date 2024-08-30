<script setup>
import LayoutAside from './components/LayoutAside.vue'
import LayoutNav from './components/LayoutNav.vue'
import SubNav from './components/SubNav.vue'
import { useGlobalStore, useMemberStore, useConsumeStore } from '@/stores'
import { onMounted, ref } from 'vue'

const globalStore = useGlobalStore()
const memberStore = useMemberStore()
const consumeStore = useConsumeStore()
onMounted(() => {
  memberStore.initMembers()
  consumeStore.getTags()
  consumeStore.getConsumeData()
})

const flag = ref(false)
const toggleFullScreen = (isFullScreen) => {
  flag.value = isFullScreen
  console.log('flag.value: ', flag.value)
}
</script>

<template>
  <div class="common-layout m-0 wh-screen duration-300">
    <el-container class="container-box wh-screen">
      <el-aside
        :width="flag ? '0px' : '200px'"
        :class="globalStore.isCollapse ? 'collapse' : ''"
      >
        <LayoutAside></LayoutAside>
      </el-aside>
      <el-container>
        <el-header
          class="pr-0! overflow-hidden duration-300"
          :height="flag ? '0px' : '60px'"
        >
          <LayoutNav></LayoutNav>
        </el-header>
        <div class="subnav-container mb-10 h-40">
          <SubNav @toggle-full-screen="toggleFullScreen" />
        </div>
        <el-main class="pt-0!">
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-aside) {
  transition: 0.3s;
  &::-webkit-scrollbar {
    display: none;
  }
}
:deep(.el-main) {
  scrollbar-width: thin;
  --un-scrollbar-width: 6px;
  --un-scrollbar-height: 6px;
}
.collapse {
  width: calc(
    var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2
  );
}
.subnav-container {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
