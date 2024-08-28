<script setup>
import { ref } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = ref(false)
const modelToggle = (e) => {
  // 获取到 transition API 实例
  const transition = document.startViewTransition(() => {
    document.documentElement.classList.toggle('dark', isDark.value)
  })

  // 在 transition.ready 的 Promise 完成后，执行自定义动画
  transition.ready.then(() => {
    const { clientX, clientY } = e
    // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
    const radius = Math.hypot(
      Math.max(clientX, innerWidth - clientX),
      Math.max(clientY, innerHeight - clientY)
    )
    const clipPath = [
      `circle(0% at ${clientX}px ${clientY}px)`,
      `circle(${radius}px at ${clientX}px ${clientY}px)`
    ]
    const isDark = document.documentElement.classList.contains('dark')
    // 自定义动画
    document.documentElement.animate(
      {
        // 如果要切换到暗色主题，在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
        clipPath: isDark ? clipPath.reverse() : clipPath
      },
      {
        duration: 500,
        // 如果要切换到暗色主题，应该裁剪 view-transition-old(root) 的内容
        pseudoElement: isDark
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)'
      }
    )
  })
}
</script>

<template>
  <el-switch
    v-model="isDark"
    :active-action-icon="Moon"
    :inactive-action-icon="Sunny"
    @click="modelToggle"
  />
</template>

<style lang="scss">
.dark::view-transition-old(root) {
  z-index: 100;
}
::view-transition-new(root),
::view-transition-old(root) {
  animation: none;
}
</style>
