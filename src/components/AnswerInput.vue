<template>
  <div class="bg-gray-900 rounded shadow p-2">
    <p :class="{'text-green-500' : isValid === true, 'text-red-500' : isValid === false}" class="text-left w-full mb-2">{{note}}</p>
    <input @keydown.enter="$emit('providedAnswer', answer)" v-model="answer" class="bg-gray-800 h-8 w-full p-2 rounded shadow">
  </div>
</template>

<script setup>
import {defineProps, ref} from 'vue';

let answer = ref('');


 defineProps({
   isValid: Boolean,
   note: String
 })

</script>

<style scoped>

</style>