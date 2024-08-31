<script setup>
defineProps({
  personInfo: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <CardContainer class="wh-full overflow-hidden cursor-pointer" id="per-card">
    <div class="per-content fd-col f-c">
      <div class="per-avatar bg-red w-90% relative overflow-hidden">
        <UglyAvatar></UglyAvatar>
      </div>
      <div class="per-info m-t-12 fs-20">
        {{ personInfo.name }}
      </div>
    </div>
  </CardContainer>
</template>

<style lang="scss" scoped>
#per-card {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:hover {
    box-shadow:
      0 0 10px 0 rgba(39, 186, 155, 0.5),
      0 0 25px 0 rgba(39, 186, 155, 0.5);
  }
  .per-avatar {
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
}
</style>
