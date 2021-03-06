import { createApp } from 'vue'

import InlineSvg from 'vue-inline-svg'
import ElementPlus from 'element-plus'
import ru from 'element-plus/es/locale/lang/ru'
import { Chart, registerables } from 'chart.js'
import VueApexCharts from 'vue3-apexcharts'
import VCalendar from 'v-calendar'
import { initVeeValidate } from '@/core/plugins/vee-validate'
import { initYup } from '@/core/plugins/yup'

import App from './App.vue'

import setupInterceptors from './core/services/setupInterceptors'

import router from './router'
import store from './store'

import '@/core/plugins/theme'
import 'bootstrap'
import initMoment from '@/core/plugins/moment'

Chart.register(...registerables);

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, {
  locale: ru
});
app.use(VueApexCharts)
app.use(VCalendar, {})

setupInterceptors(store)
app.component('inline-svg', InlineSvg)
initVeeValidate()
initYup()
initMoment()

app.mount('#app')
