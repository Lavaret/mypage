<template>
  <SimpleHeader />
  <div class="h-full w-full flex gap-3 p-3">
      <router-link to="board/solar-system" class="text-3xl p-4 transition duration-300 ease-out hover:bg-gray-900 shadow rounded bg-gray-950 h-32 flex items-center">
        <p>Solar System</p>
      </router-link>
  </div>
</template>

<script setup>
import SimpleHeader from "@/components/SimpleHeader";

</script>

<style scoped>

</style>