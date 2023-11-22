<script setup lang="ts">
import Scene from '@/views/Scene.vue'
import {onMounted} from 'vue'
import autofit from 'autofit.js'

const setRem = () => {
  const clientWidth = document.documentElement.clientWidth //获取视口宽度
  const clientHeight = document.documentElement.clientHeight //获取视口高度
  const pageWidth = clientWidth / clientHeight > 1920 / 1080 ? clientHeight * (1920 / 1080) : clientWidth;

  document.documentElement.style.fontSize = `${pageWidth / 100}px`
}
onMounted(() => {
  // autofit.init(
  //     {
  //       dh: 820,
  //       dw: 1180,
  //       el: "#app",
  //       resize: true,
  //       ignore: [
  //           "#map",
  //       ]
  //     },
  //
  //     false
  // ); // 可关闭控制台运行提示输出
  setRem()
})
window.addEventListener('resize', setRem);
</script>

<template>
  <!--  <Scene/>-->
  <router-view></router-view>
</template>

<style scoped>
:global(#app) {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/png/layerBg.png") repeat;
  pointer-events: none;
}
</style>
