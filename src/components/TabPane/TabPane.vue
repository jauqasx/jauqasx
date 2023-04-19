<script setup lang='ts'>

defineProps<{
  name: string,
  label: string
}>()

</script>

<template>
  <div class="tab-pane">
    <slot></slot>
  </div>
</template>

<style lang='less' scoped>
.tab-pane {
  width: 100%;
  height: 100%;
}
</style>