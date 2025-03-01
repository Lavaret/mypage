<template>
  <game-component>
    <template #question>
      <slot />
    </template>
    <template #game-content>
      <p>This level is under construction, sorry 😟</p>
    </template>
    <template #answers>
      <answer-input :answers="[]"></answer-input>
    </template>
  </game-component>
</template>

<script setup>

import GameComponent from "@/components/games/GameComponent";
import AnswerInput from "@/components/AnswerInput";
</script>

<style scoped>

</style>