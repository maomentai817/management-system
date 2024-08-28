<script setup>
import LayoutAside from './components/LayoutAside.vue'
import LayoutNav from './components/LayoutNav.vue'
</script>

<template>
  <div class="common-layout m-0 wh-screen duration-300">
    <el-container class="container-box bgc-#E7ECF2 wh-screen">
      <el-aside width="13vw">
        <LayoutAside></LayoutAside>
      </el-aside>
      <el-container>
        <el-header class="p-0">
          <LayoutNav></LayoutNav>
        </el-header>
        <el-main>
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
</style>
