<template>
  <div class="h-full w-full flex gap-3 p-3 flex-wrap">
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
        :internal="true"
        link="/finance"
        class="hover:bg-green-600 bg-green-500 border-green-600 hover:border-green-700"
    >
      Finance
    </BoardLink>
    <BoardLink
        :internal="true"
        link="/game"
        class="hover:bg-pink-600 bg-pink-500 border-pink-600 hover:border-pink-700"
    >
      Game
    </BoardLink>
    <BoardLink
        :internal="true"
        link="/3d"
        class="hover:bg-red-600 bg-red-500 border-red-600 hover:border-red-700"
    >
      3D View
    </BoardLink>
    <BoardLink
        :internal="true"
        link="/memory"
        class="hover:bg-purple-600 bg-purple-500 border-purple-600 hover:border-purple-700"
    >
      Memo
    </BoardLink>
  </div>
</template>

<script setup>
import BoardLink from "@/components/BoardLink"
</script>

<style scoped>

</style>