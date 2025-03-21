<template>
  <article
      class="rounded-lg border shadow border-gray-100 justify-between p-6 border-gray-800 bg-gray-900/75 flex flex-wrap gap-3"
  >
    <div v-for="(tag, index) in sortedTags" class="flex">
      <div
          class="flex flex-col p-3 flex-1"
          :class="{
            'text-2xl': index === 0,
            'text-xl': index === 1,
            'text-lg': index === 2,
          }"
          :style="{
            color: tag.color,
          }"
      >
        <span class="w-100">{{ tag.name }}</span>
        <span class="text-sm w-100">{{ tag.amount?.toFixed(2) }}</span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { transactionStore } from "@/store/transactionStore";
import { tagStore } from "@/store/tagStore";
import { watchEffect, ref, onMounted } from 'vue';

const transactions = transactionStore()
const tags = tagStore()
const sortedTags = ref([])

watchEffect(() => {
  Object.assign(sortedTags.value, tags.all)
  sortedTags.value.map((c) => c.amount = 0)
  for (let i = 0; i < transactions.data.length; i++) {
    if (transactions.data[i].tags.length) {
      const amount = transactions.data[i].amount / transactions.data[i].tags.length
      for (let j = 0; j < transactions.data[i].tags.length; j++) {
        sortedTags.value.map((c) => {
          c.amount = c.amount ? c.amount : 0;
          if (c.id === transactions.data[i].tags[j].id) {
            c.amount += amount;
          }
        })
      }
    }
  }

  sortedTags.value = sortedTags.value.sort((a, b) => {
    if (a.amount > b.amount) {
      return 1
    }

    return -1
  }).splice(0, 4)
})

onMounted(() => {
  Object.assign(sortedTags.value, tags.all)
})

</script>

<style scoped>

</style>