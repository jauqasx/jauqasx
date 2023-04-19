<script setup lang='ts'>
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  height?: string
  width?: string
  maxHeight?: string
}>(), {

})
const emits = defineEmits<{
  (e: 'scroll', Top: { scrollbar: HTMLDivElement, scrollbarTop: number }): void
}>()
const scrollbar = ref<HTMLDivElement>()
const scroll = () => {
  emits("scroll", { scrollbar: scrollbar.value as HTMLDivElement, scrollbarTop: scrollbar.value?.scrollTop as number })
}
</script>

<template>
  <div class="scrollbar">
    <div class="scrollbar__wrap" @scroll="scroll" ref="scrollbar">
      <div class="scrollbar__view">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
.scrollbar {
  position: relative;
  overflow: hidden;

  .scrollbar__wrap {
    overflow: auto;
    height: 100%;
    width: v-bind('props.width');
    height: v-bind('props.height');
    max-width: v-bind('props.maxHeight');

    .scrollbar__view {
      width: 100%;
      height: 100%;
    }

    /* 隐藏滚动条 */
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    /* 滑块 */
    &::-webkit-scrollbar-thumb {
      background-color: #e0e0e0;
      border-radius: 4px;
    }

    /* 滚动条轨道 */
    &::-webkit-scrollbar-track {
      background-color: #fff;
    }

    /* 滚动按钮 */
    &::-webkit-scrollbar-button {
      width: 0;
      height: 0;
      display: none;
    }
  }
}
</style>