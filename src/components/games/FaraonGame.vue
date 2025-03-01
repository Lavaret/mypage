<template>
  <div class="p-20 w-full flex flex-col justify-center">
    <div class="transition ease-in-out delay-150 hover:scale-125 duration-500 bg-gray-900 p-2 rounded shadow text-lg m-auto">
      Whose name is it?
    </div>

    <div class="name-box w-1/2">
      <span title="Maatkara">𓇳𓁦𓂓</span>
    </div>

    <div class="p-2 w-full">
      <answer-input :answers="faraon" @correctAnswer="goToNextLevel()"></answer-input>
    </div>
  </div>


</template>

<script setup>
import {faraon} from "@/composables/answers";
import {defineEmits} from "vue";
import AnswerInput from "@/components/AnswerInput";

const emit = defineEmits(['nextLevel']);


function goToNextLevel() {
  emit('nextLevel', 'Octopus');
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Egyptian+Hieroglyphs&display=swap');

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
  height: 147px;
  border: 1px solid darkgray;
  transform: translate(97px);
}
</style>