<template>
  <div class="overflow-y-auto list rounded">
    <Teleport to="#app">
      <modal-component :show="showModal" >
        <template #header>
          Edit transaction
        </template>
        <template #default>
          <FinanceForm ref="formRef" :saved-data="editedTransaction" />
        </template>
        <template #footer>
          <ButtonComponent size="small" @click="showModal = false">
            <XMarkIcon class="size-4" />
            <span>Cancel</span>
          </ButtonComponent>
          <ButtonComponent size="small" type="secondary" @click="handleUpdateTransaction">
            <ArrowUpTrayIcon class="size-4"/>
            <span>Update</span>
          </ButtonComponent>
        </template>
      </modal-component>
    </Teleport>

    <table
        class="min-w-full divide-y-2 text-sm divide-gray-900 bg-gray-700/50"
    >
      <thead class="ltr:text-left rtl:text-right">
      <tr>
        <th
            v-for="(column, index) in columnsTitles"
            class="whitespace-nowrap font-medium text-white bg-gray-900/75"
            :key="index"
        >
          {{ column }}
        </th>
      </tr>
      </thead>

      <tbody class="divide-y divide-gray-900">
      <tr v-for="transaction in transactions.current" :key="transaction.id" data-test="transaction-row">
        <td class="whitespace-nowrap px-4 font-medium text-white">
          {{ transaction.id }}
        </td>
        <td class="whitespace-nowrap text-gray-200">
          {{ transaction.description }}
        </td>
        <td
            data-test="amount"
            class="whitespace-nowrap"
            :class="{
              'text-red-600': transaction.amount < 0,
              'text-green-600': transaction.amount > 0
            }"
        >
          {{ transaction.amount }}
        </td>
        <td
          data-test="tag"
          class="whitespace-nowrap"
        >
          <div v-for="tag in transaction.tags">
            {{ tag.name }}
          </div>
        </td>
        <td class="whitespace-nowrap text-gray-200">
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
              <MenuItemComponent @click="handleEditTransaction(transaction.id)">
                <div class="flex justify-between gap-2">
                  <PencilSquareIcon class="size-4"/>
                  <span>Edit</span>
                </div>
              </MenuItemComponent>
              <MenuItemComponent @click="handleDelete(transaction.id)">
                <div class="flex justify-between gap-2 text-red-600">
                  <TrashIcon class="size-4"/>
                  <span>Delete</span>
                </div>
              </MenuItemComponent>
            </template>
          </MenuComponent>
        </td>
      </tr>
      </tbody>
      <tfoot class="footer h-10 bg-gray-900 text-center w-full">
        <tr>
          <td :colspan="columnsTitles.length">
            {{ transactions.current.length }} transactions visible
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import {
  EllipsisVerticalIcon,
  TrashIcon,
  PencilSquareIcon,
  ArrowUpTrayIcon,
  XMarkIcon
} from "@heroicons/vue/24/solid";
import MenuComponent from "@/components/menu/MenuComponent";
import MenuItemComponent from "@/components/menu/MenuItemComponent";
import ButtonComponent from "@/components/ButtonComponent";
import ModalComponent from "@/components/ModalComponent";
import FinanceForm from "@/components/finance/FinanceForm";
import { useDatabase } from "@/composables/useDatabase";
import { alertStore } from '@/store/alertStore'
import { transactionStore } from "@/store/transactionStore";
import { ref } from 'vue';


const {
  deleteTransaction,
  updateTransaction,
} = useDatabase();

const columnsTitles = [
  'ID',
  'Description',
  'Amount',
  'Tags',
  'Created at',
  ''
]

const transactions = transactionStore()
const alerts = alertStore()

const showModal = ref(false)
const formRef = ref(null)
const editedTransaction = ref(null)

const handleDelete = async (id) => {
  try {
    await deleteTransaction(id)

    alerts.addSuccess('transaction removed')
  } catch (error) {
    alerts.addError(error)
  } finally {
    await transactions.loadTransactions()
  }
}

const handleUpdateTransaction = async () => {
  const { id, tags: oldTags } = editedTransaction.value
  const { amount, description, created_at, tags: newTags } = formRef.value.formData

  const updated = await updateTransaction(id, amount, description, created_at)

  if (updated.length) {
    await transactions.updateTags(id, oldTags, newTags)

    await transactions.loadTransactions()

    //TODO this is not refreshing
    if(oldTags.length) {
      const notRefreshedTags = transactions.data.find((transaction) => transaction.id === id)
      notRefreshedTags.tags = newTags
    }

    showModal.value = false
  }
}

const handleEditTransaction = (id) => {
  showModal.value = true
  editedTransaction.value = transactions.data.find((t) => t.id === id)
}
</script>

<style scoped>
td {
  @apply py-2 px-4;
}

th {
  @apply py-3 px-4;
}
</style>