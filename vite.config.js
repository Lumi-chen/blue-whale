import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9521,
    proxy: {
      // 代理
      // ‘/proxy’："http://localhost:10086"
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    svgLoader()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/assets/style/element-variable-pink.scss";`,
        additionalData: `@use 'sass:math';@import "@/assets/style/theme.scss";`,
        javascriptEnabled: true
      }
    }
  }
})
