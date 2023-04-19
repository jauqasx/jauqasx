<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import { PayLoader, ZanT } from '@/svg'
import { PayStore } from '@/stote'
import { getSongById, getLyricById } from '@/api'
const payStore = PayStore()
defineProps<{
  id?: string
}>()

const bool = ref<boolean>(false)
const slider = ref<HTMLDivElement>()
const widthProgress = ref<number>(0)
const currentTime = ref<string>()
const duration = ref<string>()
const audio = ref<HTMLAudioElement>()

const mousedownSlider = (e: Event) => {
  bool.value = true
}
const clickSlider = (e: MouseEvent) => {
  _jdt(e)
}
document.onmouseup = () => {
  bool.value = false
  if (!audio.value) return
  if (payStore.payBool) {
    audio.value.play()
    console.log(11);
  }
}
document.onmousemove = (e: MouseEvent) => {
  if (!bool.value) return
  _jdt(e)
}
const _jdt = (e: MouseEvent) => {
  if (!slider.value) return
  if (!audio.value) return
  audio.value.pause()
  widthProgress.value = ((e.x - slider.value?.offsetLeft) / slider.value.clientWidth) * 100
  if (widthProgress.value >= 100) widthProgress.value = 100
  if (widthProgress.value <= 0) widthProgress.value = 0
  currentTime.value = getime(widthProgress.value / 100 * audio.value.duration)
  audio.value.currentTime = widthProgress.value / 100 * audio.value.duration
}
const timeupdate = () => {
  if (!audio.value) return
  const durations = audio.value.duration
  const currentTimes = audio.value.currentTime
  duration.value = getime(durations)
  currentTime.value = getime(currentTimes)
  widthProgress.value = (currentTimes / durations) * 100

}
const getime = (t: number): string => {
  if (!t) return `00:00`
  let m: number | string = Math.floor((t / 60) % 60)
  let s: number | string = Math.floor(t % 60)
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  return `${m}:${s}`
}
const changePayBool = () => {
  if (!audio.value) return
  if (payStore.payBool) {
    payStore.changePayBool(false)
    audio.value.pause()
  } else {
    payStore.changePayBool(true)
    audio.value.play()
  }
}
onMounted(() => {
  timeupdate()
  if (!audio.value) return
  payStore.changePayBool(!audio.value?.paused)

})
</script>

<template>
  <div class="footer-content">
    <div class="footer-img">1</div>
    <div class="footer-pay">
      <audio preload="true" :src="`https://music.163.com/song/media/outer/url?id=2039744487.mp3`" @timeupdate="timeupdate"
        ref="audio"></audio>
      <div class="footer-pay-vi">
        <div class="function-buttons">
          <div class="pay-loader" @click="changePayBool">
            <ZanT v-if="payStore.payBool"></ZanT>
            <PayLoader v-else></PayLoader>
          </div>
        </div>
        <div class="progress-bar" :style="{ height: bool ? '4px' : '2px' }" ref="slider" @click="clickSlider">
          <div class="progress" :style="{ width: `${widthProgress}%` }"></div>
          <div class="slider" @mousedown="mousedownSlider" :class="{ 'active': bool }"
            :style="{ left: `${widthProgress && widthProgress - 1}%` }">
          </div>
          <div style="width: 390px; position: relative;">
            <span class="progress-left">{{ currentTime }}</span>
            <span class="progress-right">{{ duration }}</span>
          </div>
        </div>

      </div>
    </div>
    <div class="footer-audio">3</div>
  </div>
</template>

<style lang='less' scoped>
.footer-content {
  padding: 0 20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  .footer-pay {
    height: 100%;
  }

  .footer-pay-vi {
    width: 446px;
    // background-color: aqua;
    height: 100%;
    display: flex;
    // justify-content: center;
    flex-direction: column;
    align-items: center;


    .progress-left {
      position: absolute;
      left: -50px;
      top: 50%;
      transform: translateY(-50%);
    }


    .progress-right {
      position: absolute;
      right: -50px;
      top: 50%;
      transform: translateY(-50%);
    }

    .progress-bar {
      width: 390px;
      height: 2px;
      background-color: #e6e6e8;
      position: relative;

      // overflow: hidden;


      .progress {
        width: 0;
        height: 100%;
        background-color: #ff4e4e;
        position: absolute;
        top: 0;
      }

      .slider {
        width: 0;
        height: 2px;
        border-radius: 50%;
        background-color: #ec4141;
        position: absolute;
        top: 0;
        left: 0;
      }

      &:hover {
        height: 4px !important;

        .slider {
          width: 8px;
          height: 8px;
          top: -3px;
          left: -3px;
        }
      }
    }
  }

  .active {
    width: 8px !important;
    height: 8px !important;
    top: -3px !important;
  }

  .function-buttons {
    width: 100%;
    height: 60px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .pay-loader {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background-color: #ddddde;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}
</style>