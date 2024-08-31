<script setup>
import PersonInfo from './components/PersonInfo.vue'
import { useMemberStore } from '@/stores'
import { onMounted } from 'vue'

const memberStore = useMemberStore()
onMounted(() => {
  memberStore.initMembers()
})
</script>

<template>
  <div class="member-container h-full">
    <CardContainer class="h-full">
      <div class="member-content f-s flex-wrap">
        <div
          class="per-box w-22% m-r-3% m-b-1.5% relative"
          v-for="person in memberStore.members"
          :key="person.memId"
        >
          <PersonInfo :person-info="person" />
        </div>
        <div class="per-box w-22% m-r-3% m-b-1.5% relative">
          <PersonInfo />
        </div>
      </div>
    </CardContainer>
  </div>
</template>

<style lang="scss" scoped>
.per-box {
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  & > * {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
:deep(.el-card__body) {
  .content {
    overflow-y: visible !important;
  }
}
</style>
