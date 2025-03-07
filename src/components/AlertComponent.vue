<template>
  <div
      role="alert"
      class="rounded-xl border border-gray-100 bg-white p-4 max-w-[400px]"
      :class="{
      'bg-green-600/15 border-green-700': props.type === 'success',
      'bg-red-600/15 border-red-700': props.type === 'error'
    }"
  >
    <div class="flex items-start gap-4">
    <span :class="{
      'text-green-600': props.type === 'success',
      'text-red-600': props.type === 'error'
    }">
      <CheckCircleIcon v-if="props.type === 'success'" class="size-6" />
      <XCircleIcon v-if="props.type === 'error'" class="size-6" />
    </span>

      <div class="flex-1">
        <strong class="block font-medium text-gray-900 dark:text-white">{{ title }}</strong>

        <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">
          <slot />
        </p>
      </div>

      <button
          class="text-gray-500 transition hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
          @click="$emit('closeAlert')"
      >
        <span class="sr-only">Dismiss popup</span>

        <XMarkIcon class="size-6"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CheckCircleIcon, XMarkIcon, XCircleIcon } from "@heroicons/vue/24/outline"

const props = defineProps({
  type: {
    type: String,
    required: true,
  }
})

const title = computed(() => {
  switch (props.type) {
    case 'success':
      return 'Hurray!';
    case 'error':
      return 'Oh no!';
    case 'warning':
      return 'Beware!';
    default:
      return 'Look:';
  }
})
</script>

<style scoped>

</style>