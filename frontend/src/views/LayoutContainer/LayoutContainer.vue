<script setup>
import LayoutAside from './components/LayoutAside.vue'
import LayoutNav from './components/LayoutNav.vue'
import { useGlobalStore, useMemberStore } from '@/stores'

const globalStore = useGlobalStore()
const memberStore = useMemberStore()
memberStore.initMembers()
</script>

<template>
  <div class="common-layout m-0 wh-screen duration-300">
    <el-container class="container-box wh-screen">
      <el-aside width="200px" :class="globalStore.isCollapse ? 'collapse' : ''">
        <LayoutAside></LayoutAside>
      </el-aside>
      <el-container>
        <el-header class="pr-0!">
          <LayoutNav></LayoutNav>
        </el-header>
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
</style>
