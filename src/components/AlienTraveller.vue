<template>
<div class="traveller absolute" :style="{
  transform: `translate(${posX}px, ${posY}px)`,
}"
>
  <p class="animate-bounce">🛸</p>
</div>
</template>

<script setup>
import { useMouse } from "@vueuse/core";
import { ref, watch } from 'vue'

const { x, y } = useMouse()

const lerp = (start, end, factor) => start + (end - start) * factor;

const posX = ref(x.value)
const posY = ref(y.value)

watch(y, () => {
  posY.value = lerp(posY.value, y.value, 0.1);
})

watch(x, () => {
  posX.value = lerp(posX.value, x.value, 0.1);
})


  let traveller = document.querySelector('.traveller');

  if(traveller) {
    traveller.classList.remove('on-trip', 'invisible');
  }
</script>

<style scoped>

.traveller {
  transition-property: transform;
  transition-duration: 2s;
  transform: translate(-10px, -10px);
  transition-timing-function: ease-in-out;
  rotate: 18deg;
  will-change: transform;
}
</style>