<template>
  <simple-header></simple-header>
<div class="w-full h-1/2 grid place-items-center ">
  <div class="bg-gray-900 p-3 m-3 w-3/4">
    <input class="bg-gray-800 h-8 w-full p-2 rounded shadow" v-model="inputValue">
    <p class="mt-3 text-xs h-4">{{hashValue}}</p>
  </div>

</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import sha256 from "crypto-js/sha256";
import SimpleHeader from "@/components/SimpleHeader";

let hashValue = ref('');
let inputValue = ref('');

watch(inputValue, (val) => {
  hashValue.value = sha256(val).toString();
})

</script>

<style scoped>

</style>