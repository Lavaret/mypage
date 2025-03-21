<template>
  <button
      :disabled="disabled"
      class="active:border-0 transition duration-300 ease-out shadow rounded-md flex gap-1 items-center border-2 border-double"
      :class="{
        'hover:bg-gray-900 bg-gray-800 border-gray-900 hover:border-gray-950': props.type === 'primary',
        'hover:bg-green-600 bg-green-500 border-green-600 hover:border-green-700': props.type === 'secondary',
        'hover:bg-yellow-500 bg-yellow-600 border-yellow-700 hover:border-yellow-600': props.type === 'positive',
        'p-3 text-lg': props.size === 'normal',
        'py-1 px-2 text-md': props.size === 'small',
      }"
  >
    <slot/>
  </button>
</template>

<script setup>

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