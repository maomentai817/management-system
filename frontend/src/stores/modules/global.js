import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore(
  'global',
  () => {
    const isDark = ref(JSON.parse(localStorage.getItem('isDark')) || false)
    const setDark = (flag) => {
      isDark.value = flag
    }

    const isCollapse = ref(
      JSON.parse(localStorage.getItem('global')).isCollapse || false
    )
    const setCollapse = (flag) => {
      isCollapse.value = flag
    }
    return {
      isDark,
      setDark,
      isCollapse,
      setCollapse
    }
  },
  { persist: true }
)
