<template>
  <game-component>
    <template #question>
      This is the name of one of the best Pharaohs. Can you translate it?
    </template>

    <template #game-content>
      <div class="name-box w-[18rem]">
        <span title="Maatkara">𓇳𓁦𓂓</span>
      </div>
    </template>

    <template #answers>
      <answer-input :answers="faraon" @correctAnswer="goToNextLevel()"></answer-input>
    </template>
  </game-component>

</template>

<script setup>
import {faraon} from "@/composables/answers";
import AnswerInput from "@/components/AnswerInput";
import GameComponent from "@/components/games/GameComponent";

const emit = defineEmits(['nextLevel']);


function goToNextLevel() {
  emit('nextLevel', 'Octopus');
}

</script>

<style scoped>

.name-box {
  padding: 1rem;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
  border-radius: 6rem;
  border: 1px solid darkgray;
  margin: 1rem auto;
  background-color: rgba(0, 0, 0, .1);
  font-family: "Noto Sans Egyptian Hieroglyphs", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.name-box:after {
  content: '';
  position: absolute;
  width: 1px;
  height: 9rem;
  border: 1px solid darkgray;
  transform: translate(44px);
}
</style>