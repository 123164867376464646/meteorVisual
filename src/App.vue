<script setup lang="ts">
import Scene from '@/views/Scene.vue'
</script>

<template>
<!--  <Scene/>-->
  <router-view></router-view>
</template>

<style scoped>
:global(#app) {
  width: 100vw;
  height: 100vh;
  background-color: #999;
  pointer-events: none;
}
</style>
