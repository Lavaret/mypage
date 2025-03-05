<template>
  <div class="relative">
    <button @click="showMenu = !showMenu" ref="target">
      <slot name="trigger"/>
    </button>
    <div
        class="absolute end-0 w-44 z-10 mt-2 rounded-md border border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
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
import { onClickOutside } from "@vueuse/core"
import { ref, useTemplateRef } from "vue";

const showMenu = ref(false);
const target = useTemplateRef('target')

onClickOutside(target, () => {
  if (showMenu.value) {
    showMenu.value = false
  }
})
</script>

<style scoped>

</style>