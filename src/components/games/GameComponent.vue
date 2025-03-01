<template>
  <div class="sm:w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4 justify-center m-auto">

    <div class="flex justify-center">
      <div class="question z-10 transition ease-in-out delay-150 hover:lg:scale-150 duration-500 bg-gray-900 p-2 rounded shadow text-lg m-auto">
        <slot name="question"/>
      </div>
    </div>

    <div class="game-content border rounded shadow border-gray-900 flex flex-col justify-center">
      <div v-if="!loaded">
        <LoaderComponent></LoaderComponent>
      </div>
      <div v-else>
        <slot name="game-content"/>
      </div>
    </div>

    <div class="answer">
      <slot name="answers"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LoaderComponent from "@/components/LoaderComponent";

let loaded = ref(false);

setTimeout(() => {
  loaded.value = true;
}, 500);

</script>

<style scoped>
.game-content {
  min-height: 450px;
}
</style>