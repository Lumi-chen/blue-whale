import { createApp } from 'vue'
import './assets/style/global.scss'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router/index'
import { createPinia } from 'pinia'
import * as echarts from 'echarts/core'
import { GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import setTheme from './utils/style'

const app = createApp(App)

app.use(createPinia())
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
echarts.use([GridComponent, BarChart, CanvasRenderer])

app.use(ElementPlus)
app.use(router)
app.config.globalProperties.$echarts = echarts
app.mount('#app')

setTheme('pink')
