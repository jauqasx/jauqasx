import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'
import Layout from '@/Layout/index.vue'
const routes: RouteRecordRaw[] = [
  {
    name: "Layout",
    path: "/",
    component: Layout,
    children: [
      {
        name: "发现音乐",
        path: "",
        component: () => import('@/views/DiscoverMusic/DiscoverMusic.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router