<template>
<div class="traveller on-trip invisible">
  <p>🛸</p>
</div>
</template>

<script setup>
setTimeout(() => {
  let traveller = document.querySelector('.traveller');

  if(traveller) {
    traveller.classList.remove('on-trip', 'invisible');
  }
}, 3000);
</script>

<style scoped>

.traveller {
  top: 0px;
  left: -20px;
  position: absolute;
  transition-property: transform;
  transition-duration: 10s;
  transition-timing-function: ease-in;
  rotate: 18deg;
}

.on-trip {
  transform: translate3d(110vw, 40vh, 10px);
}
</style>