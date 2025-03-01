<template>
  <div class="bg-gray-900 rounded shadow p-2">
    <p :class="noteColor" class="text-left w-full mb-2">{{note}}</p>
    <input @keydown.enter="checkAnswer()" v-model="answer" class="bg-gray-800 h-8 w-full p-2 rounded shadow">
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue';
import { useValidateAnswer } from "@/composables/useValidateAnswer";
import {getRandomGood, getRandomWrong} from "@/composables/reactions";

const props = defineProps({
  answers: Array,
})

let answer = ref('');
const { isValid } = useValidateAnswer(answer, props.answers);
let defaultNote = "Type your answer here: ";
const note = ref(defaultNote);
const noteColor = ref('')

const emit = defineEmits(['correctAnswer']);

function checkAnswer() {
  if(isValid.value === false) {
    note.value = getRandomWrong();
    noteColor.value = 'text-red-500';
  } else if(isValid.value === true) {
    note.value = getRandomGood();
    noteColor.value = 'text-green-500';
    emit('correctAnswer');
  } else {
    note.value = defaultNote;
    noteColor.value = '';
  }
}

</script>

<style scoped>

</style>