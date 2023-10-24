<template>
  <div class="bg-gray-900 rounded shadow p-2">
    <p :class="{'text-green-500' : isValid === true, 'text-red-500' : isValid === false}" class="text-left w-full mb-2">{{note}}</p>
    <input @keydown.enter="checkAnswer()" v-model="answer" class="bg-gray-800 h-8 w-full p-2 rounded shadow">
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue';
import { useValidateAnswer } from "@/composables/useValidateAnswer";
import {getRandomGood, getRandomWrong} from "@/composables/reactions";

let answer = ref('');
const check = useValidateAnswer(answer, props.answers);
let defaultNote = "Type your answer here: ";
let note = ref(defaultNote);
let isValid;

const emit = defineEmits(['correctAnswer']);

function checkAnswer() {
  isValid = check();
  if(isValid.value === false) {
    note.value = getRandomWrong();
  } else if(isValid.value === true) {
    note.value = getRandomGood();
    emit('correctAnswer');
  } else {
    note.value = defaultNote;
  }
}

 const props = defineProps({
   answers: Array,
 })

</script>

<style scoped>

</style>