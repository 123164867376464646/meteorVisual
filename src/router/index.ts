import { createRouter, createWebHashHistory } from "vue-router"
import Home from "@/views/Home.vue"
import d3Demo from '@/views/d3Demo.vue'

const routes = [
  { path: "/", component: Home },
  { path: "/d3Demo", component: d3Demo },
]



export default createRouter({
  routes,
  history: createWebHashHistory()
})
