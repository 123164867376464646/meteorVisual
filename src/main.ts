import {createApp} from 'vue'
import './style.scss'
import 'animate.css'
import './js/leaflet.fix'
import App from './App.vue'
import router from "./router/index.js"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'leaflet.chinatmsproviders'
createApp(App).use(ElementPlus, {locale: zhCn,}).use(router).mount('#app')
