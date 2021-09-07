import { createApp } from 'vue'

import { initVeeValidate } from '@/core/plugins/vee-validate'
import { initYup } from '@/core/plugins/yup'

import InlineSvg from 'vue-inline-svg'
import ElementPlus from 'element-plus'

import App from './App.vue'

import './registerServiceWorker'
import setupInterceptors from './core/services/setupInterceptors'

import router from './router'
import store from './store'

import '@/core/plugins/theme'
import 'bootstrap'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus);

setupInterceptors(store);
app.component('inline-svg', InlineSvg)
initVeeValidate()
initYup()

app.mount('#app')
