<template>
<footer class="absolute bottom-1 w-full">
  <p class="text-xs text-gray-500 m-auto">&copy; {{currentYear}} Justyna Sieja | All Rights Reserved</p>
</footer>
</template>

<script setup>

import { ref } from 'vue';

let currentYear = ref(new Date().getFullYear());

</script>

<style scoped>

</style>