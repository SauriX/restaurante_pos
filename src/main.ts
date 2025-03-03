import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import {createBootstrap} from 'bootstrap-vue-next'

import { createPinia } from 'pinia'
import "@/assets/styles/scss/custom.scss"; // Importa los estilos personalizados
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'bootstrap/dist/css/bootstrap.css';
const pinia = createPinia()
createApp(App).use(pinia).use( createBootstrap()).use(router).mount('#app')
