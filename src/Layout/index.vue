<script setup lang='ts'>
import { Header, Scrollbar, Footer } from '@/components'
import { Shutdown, Wangyi, Utmost, Least, Shortbar, Mail, Clothes, Setup } from '@/svg'
import { reactive, ref } from 'vue';
import { RouterView } from 'vue-router'
import { nanoid } from 'nanoid'
const { ipcRenderer } = window.require('electron')
const sidebarClassList = reactive([
  { id: nanoid(), title: "发现音乐" },
  { id: nanoid(), title: "视频" },
  { id: nanoid(), title: "朋友" },
  { id: nanoid(), title: "直播" },
  { id: nanoid(), title: "私人FM" }
])
const myMusicList = reactive([
  { id: nanoid(), title: "本地音乐" },
  { id: nanoid(), title: "下载管理" },
  { id: nanoid(), title: "我的音乐盘" },
  { id: nanoid(), title: "我的电台" },
  { id: nanoid(), title: "我的收藏" }
])
const active = ref<string>(sidebarClassList[0].id)
const closeBtn = (str: string) => {
  ipcRenderer.send(`window-${str}`)
}
const activeBtn = (i: string) => {
  active.value = i
}
</script>

<template>
  <div class="layout">
    <Header height="60px" style="background-color: #ec4141;-webkit-app-region: drag; -webkit-user-select: none;">
      <div class="header">
        <div class="icon">
          <Wangyi class="icon-i"></Wangyi>
          <span class="icon-text">网易云音乐</span>
        </div>
        <div class="right-btn">
          <Setup class="icon-i"></Setup>
          <Clothes class="icon-i"></Clothes>
          <Mail class="icon-i"></Mail>
          <Shortbar class="icon-i"></Shortbar>
          <span title="最小化" @click="() => closeBtn('min')">
            <Least class="icon-i"></Least>
          </span>
          <span title="最大化" @click="() => closeBtn('max')">
            <Utmost class="icon-i"></Utmost>
          </span>
          <span title="关闭" @click="() => closeBtn('close')">
            <Shutdown class="icon-i"></Shutdown>
          </span>
        </div>
      </div>
    </Header>
    <section class="content">
      <div class="sidebar">
        <div class="sidebar-border"></div>
        <Scrollbar height="78vh" width="100%">
          <div style="padding: 10px;">
            <div v-for="(item) in sidebarClassList" class="sidebar-item" :key="item.id"
              :class="{ 'sidebar-active': active === item.id }" @click="() => activeBtn(item.id)">
              {{ item.title }}
            </div>
            <div style="font-size: 12px;color: #c3c3c3;margin-top: 20px;padding-left:6px; margin-bottom: 10px;">我的音乐</div>
            <div class="sidebar-item" v-for="item in myMusicList" :key="item.id"
              :class="{ 'sidebar-active': active === item.id }" @click="() => activeBtn(item.id)">
              {{ item.title }}
            </div>
          </div>
        </Scrollbar>
      </div>
      <main class="main">
        <Scrollbar height="84vh" width="100%">
          <RouterView></RouterView>
        </Scrollbar>
      </main>
    </section>
    <footer class="footer">
      <div class="footer-border"></div>
      <Footer></Footer>
    </footer>
  </div>
</template>

<style lang='less' scoped>
.header {
  width: 100%;
  height: 60px;
  padding: 0 10px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon {
    display: flex;
    align-items: center;
  }

  .icon-text {
    color: #fff;
    font-size: 20px;
    letter-spacing: 3px;
    font-family: STXingkai;
  }

  .right-btn {
    display: flex;
    width: 240px;
    justify-content: space-between;
  }

  .icon-i {
    -webkit-app-region: no-drag;

    &:hover {
      cursor: pointer;
    }
  }
}

.layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.content {
  display: flex;
  justify-content: space-between;
  user-select: none;

  .main {
    flex: 1;
  }

  .sidebar {
    width: 200px;
    height: 100vh;
    background-color: #ffffff;
    position: relative;

    .sidebar-border {
      position: absolute;
      top: 0;
      right: 0;
      background-color: #e1e1e1;
      height: 100%;
      width: 1px;

    }

    .sidebar-item {
      height: 36px;
      margin-bottom: 4px;
      line-height: 36px;
      padding: 0 6px;
      border-radius: 4px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      cursor: pointer;
      transition: all 0.3s;
      color: #333333;
      font-size: 16px;

      &:hover {
        background-color: #f6f6f7;
      }
    }

    .sidebar-active {
      background-color: #f6f6f7;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
    }
  }
}

.footer {
  height: 74px;
  width: 100vw;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #f6f6f8;

  .footer-border {
    width: 100%;
    height: 0px;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #e1e1e1;
    }
  }

}
</style>