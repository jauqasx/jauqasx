<script setup lang='ts'>
import { computed, ref, useSlots } from 'vue'
import type { VNode, ComponentOptions } from 'vue'
import { Scrollbar } from '@/components'
interface TabsHeaderType {
  label: string
  name: string
}
const slots = useSlots()
const currentTabName = ref<string>('')
const props = defineProps<{
  name: string,
  default?: string
}>()
currentTabName.value = props.default || ''
const active = ref<number>(0)
const TabsHeader = computed(() => {
  if (slots && slots.default) {
    const vNodes: VNode[] = slots.default()
    return vNodes.map((vNode, index) => {
      const tag = (vNode.type as ComponentOptions)
      if (vNode.props?.name === props.default) active.value = index
      if (tag.__name === 'TabPane') {
        return vNode.props as TabsHeaderType
      }
    })
  }
})

const renderContent = () => {
  return slots.default && slots.default()
  // .find(it => {
  //   if (currentTabName.value.length === 0) return true
  //   console.log(it);
  //   return it.props?.name === currentTabName.value
  // })
}
const changeBtn = (item: TabsHeaderType, index: number) => {
  if (!item) return alert('请传入label和name')
  active.value = index
  currentTabName.value = item.name
}

</script>

<template>
  <div class="Tabs">
    <Scrollbar>
      <div class="tabs-header">
        <div class="tabs-item" v-for="item, index in TabsHeader " :key="item?.name"
          :class="{ 'tabs-item-active': active === index }" @click="() => changeBtn(item as TabsHeaderType, index)">
          {{ item?.label }}
        </div>
      </div>
    </Scrollbar>
    <div class="tabs__content">
      <component :is="item" v-show="currentTabName === item.props?.name || currentTabName.length === 0 && index === 0"
        v-for="item, index in renderContent()" :key="index"></component>
    </div>
  </div>
</template>

<style lang='less' scoped>
.tabs-header {
  display: flex;
  height: 70px;
  align-items: center;
  font-size: 16px;
  color: #373737;
  flex-wrap: nowrap;
  white-space: nowrap;

  .tabs-item {
    margin-right: 26px;
    cursor: pointer;
    position: relative;
    text-align: center;
  }

  .tabs-item-active {
    font-size: 18px;
    font-weight: 600;

    &::after {
      content: '';
      width: 60px;
      height: 3px;
      background-color: #ec4141;
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 2px;
    }
  }
}

.tabs__content {
  flex: 1;
}

.Tabs {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>