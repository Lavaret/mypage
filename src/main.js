import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router';
import { createPinia } from 'pinia'
import Vueform from '@vueform/vueform'
import vueformConfig from './../vueform.config'

const app = createApp(App);
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Vueform, vueformConfig)
app.mount('#app')
