<template>
  <router-link
      v-if="internal"
      :to="props.link"
      class="text-3xl p-4 transition active:border-0 duration-300 ease-out shadow rounded-lg h-32 flex items-center border-r-2 border-b-4"
      :class="props.class"
  >
    <slot/>
  </router-link>
  <a
      v-else
      :href="props.link"
      class="text-3xl p-4 transition active:border-0 duration-300 ease-out shadow rounded-lg h-32 flex items-center border-r-2 border-b-4"
      :class="props.class"
  >
    <slot/>
  </a>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  link: {
    required: true,
    type: String,
  },
  class: {
    required: true,
    type: String,
  },
  internal: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>

</style>