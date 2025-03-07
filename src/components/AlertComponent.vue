<template>
  <Transition
      enter-from-class="translate-x-[150%] opacity-10"
      enter-to-class="translate-x-[0%] opacity-80"
      enter-active-class="transition duration-300 ease-in-out"
      leave-from-class="translate-x-[0%] opacity-80"
      leave-to-class="translate-x-[150%] opacity-10"
  >
    <div class="fixed right-2 text-left z-50 top-[3rem]">
    <div
        role="alert"
        class="rounded-xl border border-gray-100 bg-white p-4 opacity-85 dark:border-gray-800 dark:bg-gray-900 max-w-[400px]"
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
  </div>
  </Transition>
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