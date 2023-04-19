import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue({
    reactivityTransform: true
  }),
  electron({
    entry: 'E/electron.ts'
  })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "Layout": fileURLToPath(new URL('./src/Layout/', import.meta.url)),
    }
  },

})
