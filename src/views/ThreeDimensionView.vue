<template>
  <canvas width="1920" height="1080" id="my_canvas" ></canvas>
</template>

<script setup>
import { start } from '@/scripts/square3d'
import { onMounted } from "vue";

onMounted(async () => {
  start()
})
</script>

<style scoped>
canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden
}
</style>