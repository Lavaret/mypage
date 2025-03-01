<template>
  <article
      class="rounded-lg border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
  >
    <div>
      <p class="text-sm text-gray-500 dark:text-gray-400">Profit</p>

      <p class="text-2xl font-medium text-gray-900 dark:text-white">{{ `${currentAmount} PLN` }}</p>
    </div>

    <div
        class="mt-1 flex gap-1"
        v-if="difference"
        :class="{
          'text-red-600': !increasing,
          'text-green-600': increasing
        }"
    >
      <ArrowTrendingUpIcon v-if="increasing" class="size-4"/>
      <ArrowTrendingDownIcon v-else class="size-4"/>

      <p class="flex gap-2 text-xs">
        <span class="font-medium"> {{ `${difference}%` }} </span>
        <span class="text-gray-500 dark:text-gray-400"> Since last week </span>
      </p>

    </div>

  </article>

</template>

<script setup>
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/vue/16/solid'
import { computed, defineProps } from "vue";

const props = defineProps({
  currentAmount: {
    type: Number,
    default: 0,
  },
  previousAmount: {
    type: Number,
    default: 0
  }
})

const increasing = computed(() => (props.currentAmount >= props.previousAmount))
const difference = computed(() => (props.currentAmount * 100 / props.previousAmount))

</script>

<style scoped>

</style>