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
import setTheme, {handleMode} from './utils/style'
import i18n from './i18n'
import 'virtual:svg-icons-register'
import svgIcon from './components/svgIcon.vue'

const app = createApp(App)

app.use(createPinia())
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('SvgIcon', svgIcon)
echarts.use([GridComponent, BarChart, CanvasRenderer])

app.use(ElementPlus)
app.use(router)
app.use(i18n)
app.config.globalProperties.$echarts = echarts
app.mount('#app')

setTheme('pink')
handleMode()
