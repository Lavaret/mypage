<template>
  <canvas width="1920" height="1080" id="my_canvas" ></canvas>
  <div class="fps">FPS: <span id="fps"></span></div>
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

div.fps{
  position: absolute;
  color: hotpink;
  font-size: 20px;
  font-family: "Arial";
  padding: 4px;
}

</style>