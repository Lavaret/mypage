<template>
  <div>
    <button @click="showMenu = !showMenu">
      <slot name="trigger"/>
    </button>
    <div
        class="fixed translate-x-[-7rem] w-44 z-10 mt-2 rounded-md border border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
        role="menu"
        v-if="showMenu"
    >
      <div class="p-2 flex flex-col items-end gap-1">
        <slot name="content"/>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";

const showMenu = ref(false);
</script>

<style scoped>

</style>