<template>
  <SimpleHeader />
  <div class="h-full w-full flex gap-3 p-3">
      <router-link to="board/solar-system" class="text-3xl p-4 transition duration-300 ease-out hover:bg-gray-900 shadow rounded bg-gray-950 h-32 flex items-center">
        <p>Solar System</p>
      </router-link>

      <a href="https://hopeful-lovelace-0427e2.netlify.app/" class="text-3xl p-4 transition duration-300 ease-out hover:bg-amber-800 shadow rounded bg-amber-900 h-32 flex items-center">
        <p>Spacer</p>
      </a>

    <a href="https://gallant-albattani-4a9ed5.netlify.app/" class="text-3xl p-4 transition duration-300 ease-out hover:bg-blue-500 shadow rounded bg-blue-600 h-32 flex items-center">
      <p>Tic tac toe</p>
    </a>
  </div>
</template>

<script setup>
import SimpleHeader from "@/components/SimpleHeader";

</script>

<style scoped>

</style>