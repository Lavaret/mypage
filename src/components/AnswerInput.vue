<template>
  <div class="bg-gray-900 rounded shadow p-2">
    <p :class="noteColor" class="text-left w-full mb-2">{{note}}</p>
    <input @keydown.enter="checkAnswer()" v-model="answer" class="bg-gray-800 h-8 w-full p-2 rounded shadow">
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits, computed } from 'vue';
import { useValidateAnswer } from "@/composables/useValidateAnswer";
import {getRandomGood, getRandomWrong} from "@/composables/reactions";

let answer = ref('');
const check = useValidateAnswer(answer, props.answers);
let defaultNote = "Type your answer here: ";
let note = ref(defaultNote);
let isValid = ref(null);

const noteColor = computed(() => ({
  'text-green-500' : isValid.value === true,
  'text-red-500' : isValid.value === false
}))
const emit = defineEmits(['correctAnswer']);

function checkAnswer() {
  let validation = check();
  isValid.value = validation.value;
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