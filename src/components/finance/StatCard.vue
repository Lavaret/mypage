<template>
  <article
      class="rounded-lg border shadow border-gray-100 p-6 border-gray-800 bg-gray-900/75"
  >
    <div>
      <p class="text-sm text-gray-400">Profit</p>

      <p class="text-2xl font-medium text-white">{{ `${currentAmount} PLN` }}</p>
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
        <span class="text-gray-500 dark:text-gray-400"> Since last month </span>
      </p>

    </div>

  </article>

</template>

<script setup>
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/vue/16/solid'
import { computed } from "vue";

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
const difference = computed(() => {
  const amount = props.currentAmount * 100 / props.previousAmount
  return amount.toFixed(2)
})

</script>

<style scoped>

</style>