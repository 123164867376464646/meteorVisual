import { createRouter, createWebHashHistory } from "vue-router"
import Home from "@/views/Home.vue"
import d3Demo from '@/views/d3Demo.vue'
import test from '@/views/test.vue'

const routes = [
  { path: "/", component: Home },
  { path: "/d3Demo", component: d3Demo },
  { path: "/test", component: test },
]



export default createRouter({
  routes,
  history: createWebHashHistory()
})
