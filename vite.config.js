import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
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
    svgLoader(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
      symbolId: 'icon-[name]',
      inject: 'body-last'
    })
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
