<template>
  <thead class="ltr:text-left rtl:text-right">
    <tr>
      <th
          v-for="(column, index) in props.columns"
          class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
          :key="index"
      >
        {{ column }}
      </th>
    </tr>
  </thead>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  }
})

</script>

<style scoped>

</style>