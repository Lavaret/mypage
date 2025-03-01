<template>
  <div class="h-full w-full flex gap-3 p-3">
    <BoardLink
        :internal="true"
        link="board/solar-system"
        class="hover:bg-gray-900 bg-gray-800 border-gray-900 hover:border-gray-950"
    >
      Solar System
    </BoardLink>
    <BoardLink
        link="https://hopeful-lovelace-0427e2.netlify.app/"
        class="hover:bg-amber-600 bg-amber-500 border-amber-600 hover:border-amber-700"
    >
      Spacer
    </BoardLink>
    <BoardLink
        link="https://gallant-albattani-4a9ed5.netlify.app/"
        class="hover:bg-blue-600 bg-blue-500 border-blue-600 hover:border-blue-700"
    >
      Tic tac toe
    </BoardLink>
    <BoardLink
        link="/finance"
        class="hover:bg-green-600 bg-green-500 border-green-600 hover:border-green-700"
    >
      Finance
    </BoardLink>
  </div>
</template>

<script setup>
import BoardLink from "@/components/BoardLink"
</script>

<style scoped>

</style>