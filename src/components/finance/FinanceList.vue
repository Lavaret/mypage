<template>
  <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
    <table
        class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900"
    >
      <thead class="ltr:text-left rtl:text-right">
      <tr>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
          ID
        </th>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
          Description
        </th>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Amount</th>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
          Created At
        </th>
      </tr>
      </thead>

      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
      <tr v-for="transaction in transactions.data" :key="transaction.id">
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
          {{ transaction.id }}
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
          {{ transaction.description }}
        </td>
        <td
            class="whitespace-nowrap px-4 py-2"
            :class="{
              'text-red-600': transaction.amount < 0,
              'text-green-600': transaction.amount > 0
            }"
        >
          {{ transaction.amount }}
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
          {{ new Date(transaction.created_at).toLocaleDateString('pl-PL', {
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          }}
        </td>
      </tr>

      </tbody>
    </table>
  </div>
</template>

<script setup>
import { transactionStore } from "@/store/transactionStore";

const transactions = transactionStore()
</script>

<style scoped>

</style>