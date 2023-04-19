<script setup lang='ts'>
import { Tabs, TabPane, CarouselMap } from '@/components'
import { carouselMap } from '@/api'
import { reactive } from 'vue';
import type { carouselMapType } from '@/types/discoverMusic'
const banners = reactive<carouselMapType['banners']>([])
const getcarouselMapapi = async () => {
  const { data } = await carouselMap({ type: 2 })
  banners.push(...data.banners)
}
getcarouselMapapi()
</script>

<template>
  <div class="discover-music">
    <Tabs name="tabs" default="user">
      <TabPane label="个性推荐" name="user">
        <CarouselMap :banners="banners"></CarouselMap>
      </TabPane>
      <TabPane label="歌单" name="tab">
      </TabPane>
      <TabPane label="电台主播" name="tabs">3</TabPane>
      <TabPane label="排行榜" name="tab1">4</TabPane>
      <TabPane label="歌手" name="tab3">5</TabPane>
      <TabPane label="最新音乐" name="tab12">6</TabPane>
    </Tabs>
  </div>
</template>

<style lang='less' scoped>
.discover-music {
  padding: 0 34px;
}
</style>