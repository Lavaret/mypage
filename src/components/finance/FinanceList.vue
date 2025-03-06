<template>
  <div class="overflow-x-auto overflow-y-visible rounded-lg">
    <table
        class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-900 dark:bg-gray-700"
    >
      <TableHeaderComponent
          class="bg-gray-900"
          :columns="['ID','Description', 'Amount', 'Created at', '']"
      />

      <tbody class="divide-y divide-gray-200 dark:divide-gray-900">
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
        <td class="text-center">
          <MenuComponent>
            <template #trigger>
              <EllipsisVerticalIcon class="size-5" />
            </template>
            <template #content>
              <MenuItemComponent @click="handleDelete(transaction.id)">
                <div class="flex justify-end gap-2 text-red-600">
                  <TrashIcon class="size-4"/>
                  Delete
                </div>
              </MenuItemComponent>
            </template>
          </MenuComponent>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { transactionStore } from "@/store/transactionStore";
import TableHeaderComponent from "@/components/finance/TableHeaderComponent";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/vue/24/solid";
import MenuComponent from "@/components/finance/MenuComponent";
import MenuItemComponent from "@/components/finance/MenuItemComponent";
import { useDatabase } from "@/composables/useDatabase";

const {
  deleteTransaction,
} = useDatabase();

const transactions = transactionStore()

const handleDelete = (id) => {
  const error = deleteTransaction(id)

  if (error) {
    console.log(error.value)
  } else {
    transactions.data = transactions.data.filter((transaction) => transaction.id !== id)
  }
}
</script>

<style scoped>

</style>