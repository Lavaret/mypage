<template>
<div class="traveller absolute invisible" :style="{ transform: `translate(${x + 150}px, ${y - 100}px)` }"
>
  <p class="animate-bounce">🛸</p>
</div>
</template>

<script setup>
import { useMouse } from "@vueuse/core";

const { x, y } = useMouse()

setTimeout(() => {
  let traveller = document.querySelector('.traveller');

  if(traveller) {
    traveller.classList.remove('on-trip', 'invisible');
  }
}, 100);
</script>

<style scoped>

.traveller {
  transition-property: transform;
  transition-duration: 1s;
  transition-timing-function: ease-in-out;
  rotate: 18deg;
}
</style>