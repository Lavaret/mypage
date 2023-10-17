<template>
  <div class="w-100 flex justify-end mb-6 p-2 gap-2">
    <router-link class="router-link" to="/">Hello</router-link>
    <router-link class="router-link" to="/game">Game</router-link>
    <router-link class="router-link" to="/board">Board</router-link>
  </div>
</template>

<script setup>

</script>

<style scoped>
 .router-link {
   @apply hover:bg-gray-900 py-1 px-2 rounded
 }

 .router-link-active {
   @apply bg-gray-900
 }
</style>