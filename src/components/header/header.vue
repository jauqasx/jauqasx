<script setup lang='ts'>

const props = withDefaults(defineProps<{
  height?: string
}>(), {
  height: '60px'
})


</script>

<template>
  <header class="header" :style="{ height: props.height }">
    <slot></slot>
  </header>
</template>

<style lang='less' scoped>
.header {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;

}
</style>