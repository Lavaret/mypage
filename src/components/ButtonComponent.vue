<template>
  <button
      :disabled="disabled"
      class="active:border-0 transition duration-300 ease-out shadow rounded-lg flex items-center border-r-2 border-b-4"
      :class="{
        'hover:bg-gray-900 bg-gray-800 border-gray-900 hover:border-gray-950': props.type === 'primary',
        'hover:bg-green-600 bg-green-500 border-green-600 hover:border-green-700': props.type === 'secondary',
        'p-3 text-lg': props.size === 'normal',
        'p-1 text-md': props.size === 'small',
      }"
  >
    <slot/>
  </button>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'normal'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

</script>

<style scoped>

</style>