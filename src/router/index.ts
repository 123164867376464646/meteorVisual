import { createRouter, createWebHashHistory } from "vue-router"
import Home from "@/views/Home.vue"
import d3Demo from '@/views/d3Demo.vue'
import DataSources_NOAA from "@/views/DataSources_NOAA.vue";

const routes = [
  { path: "/myrouter1111", component: Home },
  { path: "/d3Demo", component: d3Demo },
  { path: "/", component: DataSources_NOAA },
]



export default createRouter({
  routes,
  history: createWebHashHistory()
})
