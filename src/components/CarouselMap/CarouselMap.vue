<script setup lang='ts'>
import type { carouselMapType } from '@/types/discoverMusic'
import { onMounted, onUnmounted, ref } from 'vue';
import { Advance } from '@/svg'
const props = defineProps<{
  banners: carouselMapType['banners']
}>()
const current = ref<number>(1)
const sliderList = ref<HTMLDivElement>()
const left = ref<number>(0)
const right = ref<number>(2)
const rightTr = ref('')
const leftTr = ref('')
const setBanner = ref<number>(0)
const bool = ref(false)
const clientWidth = ref()
const chnage = () => {
  if (sliderList.value && sliderList.value.children) {
    left.value = (current.value - 1 + sliderList.value?.children.length) % sliderList.value.children.length
    right.value = (current.value + 1) % sliderList.value.children.length
  }
}
const variationLocation = () => {
  if (!sliderList.value) return
  clientWidth.value = sliderList.value.clientWidth
  leftTr.value = (-sliderList.value.clientWidth / 5) + 'px'
  rightTr.value = sliderList.value.clientWidth / 5 + 'px'
}
const next = () => {
  if (!sliderList.value) return
  current.value = (current.value + 1) % sliderList.value?.children.length
  chnage()
  variationLocation()
}
const pre = () => {
  if (!sliderList.value) return
  current.value = (current.value + sliderList.value?.children.length - 1) % sliderList.value?.children.length
  chnage()
  variationLocation()
}
const mouseenterImg = () => {
  bool.value = true
  window.clearInterval(setBanner.value)
}
const mouseleaveImg = () => {
  setBanner.value = window.setInterval(() => {
    next()
  }, 10000)
  bool.value = false
}
const mouseleaveActive = (i: number) => {
  window.clearInterval(setBanner.value)
  current.value = i
  chnage()
}
window.onresize = () => {
  variationLocation()
}
onMounted(() => {
  variationLocation()
})
setBanner.value = window.setInterval(() => {
  next()
}, 10000)
onUnmounted(() => {
  console.log(11);
  window.clearInterval(setBanner.value)
})
</script>

<template>
  <div class="carousel-map">
    <div class="carousel-img" ref="sliderList" @mouseleave="mouseleaveImg" @mouseenter="mouseenterImg">
      <div class="banner-box" v-for="item, index in props.banners" :key="item.bannerId" :class="{
        'banner-box-left': index === left,
        'banner-box-center': index === current,
        'banner-box-right': index === right
      }">
        <img :src="item.pic">
        <div class="banner-type">
          <div class="banner-type-item">{{ item.typeTitle }}</div>
        </div>
      </div>
    </div>
    <ul class="carousel-list">
      <li v-for="item, index in props.banners" :key="item.bannerId" :class="{ 'active': index === current }"
        @mouseenter="() => mouseleaveActive(index)"></li>
    </ul>
    <div class="operate-btn" :style="{ 'display': bool ? 'block' : 'none' }" @mouseleave="mouseleaveImg"
      @mouseenter="mouseenterImg">
      <div class="pre" @click="() => pre()">
        <span style="transform: rotate(180deg);">
          <Advance class="icon"></Advance>
        </span>
      </div>
      <div class="next" @click="() => next()">
        <span>
          <Advance class="icon"></Advance>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
.carousel-map {
  width: 100%;
  height: 224px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  .carousel-img {
    height: 190px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .banner-box {
      width: 430px;
      position: absolute;
      border-radius: 6px;
      overflow: hidden;
      z-index: 0;
      transition: all 0.5s ease-in-out;
      transition: height none;
      cursor: pointer;

      .banner-type {
        position: relative;

        .banner-type-item {
          position: absolute;
          width: 46px;
          height: 18px;
          background-color: #cc4a4a;
          color: #fff;
          right: 0;
          top: -15px;
          border-top-left-radius: 6px;
          font-size: 8px;
          text-align: center;
          line-height: 18px;
        }
      }

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .banner-box-left {
      // left: 0px;
      z-index: 1;
      transform: translateX(v-bind(leftTr));
    }

    .banner-box-right {
      // right: 0px;
      z-index: 1;
      transform: translateX(v-bind(rightTr));
    }

    .banner-box-center {
      transform: scale(1.26, 1.15);
      z-index: 2;
    }
  }


  .carousel-list {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    li {
      width: 6px;
      height: 6px;
      background-color: #e6e6e6;
      border-radius: 50%;
      margin: 0 6px;
    }

    .active {
      background-color: #ec4141;
    }
  }

  .operate-btn {
    width: 100%;
    top: 50%;
    left: 50%;
    z-index: 5;

    .pre,
    .next {
      position: absolute;
      top: 50%;
      width: 30px;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #fff;
      transform: translate(60%, -100%);

      .icon {
        transform: translate(1px, 2px);
      }
    }

    .pre {
      left: 50px;
    }

    .next {
      right: 50px;
      transform: translate(-60%, -100%) !important;
    }
  }

}
</style>