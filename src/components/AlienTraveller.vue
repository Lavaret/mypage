<template>
<div class="traveller" :style="{
  transform: `translate(${posX}px, ${posY}px)`,
}"
>
  <p class="animate-bounce ship">🛸</p>
</div>
</template>

<script setup>
import { useMouse } from "@vueuse/core";
import { ref, onMounted } from 'vue'

const { x, y } = useMouse()

const lerp = (start, end, factor) => start + (end - start) * factor;

const posX = ref(0)
const posY = ref(0)

// Use requestAnimationFrame for smooth animation
let animationId = null;

const updatePosition = () => {
  posX.value = lerp(posX.value, x.value, 0.03);
  posY.value = lerp(posY.value, y.value, 0.03);
  animationId = requestAnimationFrame(updatePosition);
}

onMounted(() => {
  // Initialize position
  posX.value = x.value;
  posY.value = y.value;
  // Start animation loop
  updatePosition();
})

// Clean up animation on unmount
import { onUnmounted } from 'vue'
onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
})
</script>

<style scoped>

.traveller {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1000;
  transform-origin: center;
  will-change: transform;
}

.ship {
  rotate: 18deg;
}
</style>