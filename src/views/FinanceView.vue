<template>
  <div class="flex flex-col justify-center items-center h-full p-3">
    <Teleport to="#app">
      <modal-component :show="showModal" >
        <template #header>
          <div v-if="deposit">
            New deposit
          </div>
          <div v-else>
            New expense
          </div>
        </template>
        <template #default>
          <FinanceForm ref="formRef"/>
        </template>
        <template #footer>
          <ButtonComponent size="small" @click="showModal = false">Cancel</ButtonComponent>
          <ButtonComponent size="small" type="secondary" @click="handleFormSubmit">
            <PlusIcon class="size-3"/>
            Add
          </ButtonComponent>
        </template>
      </modal-component>
    </Teleport>
    
    <LoginComponent
        v-show="!user.loggedIn"
        @logged-in="transactions.loadTransactions()"
    />

    <div v-if="user.loggedIn" class="flex flex-col gap-4 md:w-2/3 w-full text-left m-auto">

      <div class="flex-col sm:flex-row flex gap-3">
        <StatCard :current-amount="totalAmount" :previous-amount="previousAmount" class="flex-1"/>
        <TagStat class="flex-1" />
      </div>
      <div class="flex gap-4 justify-center sm:ml-auto sm:justify-end flex-row">
        <ButtonComponent
            @click="showModal = true"
            size="small"
            type="positive"
            class="transaction-button"
            data-test="expense-button"
        >
          <ArrowUpIcon class="size-4"/>
          Expense
        </ButtonComponent>
        <ButtonComponent
            @click="deposit = true; showModal = true;"
             size="small"
            type="secondary"
            class="transaction-button"
             data-test="add-transaction-button"
        >
          <ArrowDownIcon class="size-4"/>
          Deposit
        </ButtonComponent>
      </div>

      <FinanceList />

      <br/>
      <button @click="logout">logout</button>
    </div>
  </div>

</template>
<script setup>

import FinanceList from "@/components/finance/FinanceList";
import StatCard from "@/components/finance/stats/StatCard";
import LoginComponent from "@/components/finance/LoginComponent";
import FinanceForm from "@/components/finance/FinanceForm";
import { useDatabase } from "@/composables/useDatabase";
import { userStore } from '@/store/userStore'
import { transactionStore } from "@/store/transactionStore";
import { tagStore } from "@/store/tagStore";
import { onMounted, computed, ref, watch } from "vue";
import ButtonComponent from "@/components/ButtonComponent";
import { ArrowDownIcon, ArrowUpIcon, PlusIcon } from "@heroicons/vue/16/solid";
import ModalComponent from "@/components/ModalComponent";
import { alertStore } from '@/store/alertStore'
import TagStat from "@/components/finance/stats/TagStat";

const alerts = alertStore()
const user = userStore()
const transactions = transactionStore()
const tags = tagStore()
const showModal = ref(false);
const formRef = ref(null);
const deposit = ref(false);

const totalAmount = computed(() => {
  let amount = 0;
  transactions.current.forEach((transaction) => {
    amount += transaction.amount
  })

  return Number(amount.toFixed(2))
})

const previousAmount = computed(() => {
  const month = new Date().getMonth() - 1
  const year = new Date().getFullYear()
  let amount = 0;
  const filteredTransactions = transactions.filterByDate(month, year)

  filteredTransactions.forEach((transaction) => {
    amount += transaction.amount
  })

  return Number(amount.toFixed(2))
})

const {
  addTransaction,
} = useDatabase();

const logout = () => {
  user.loggedIn = false
}

const handleFormSubmit = async () => {

  const { description, amount, created_at, tags: newTags } = formRef.value.formData

  const [data] = await addTransaction({
    description,
    amount: deposit.value ? amount : amount * -1,
    created_at,
    user_id: user.data.id
  })

  if (data) {
    if (newTags.length) {
      await transactions.addManyTags(data.id, newTags)
    }

    alerts.addSuccess('Added transaction')
    showModal.value = false
    await transactions.loadTransactions()
  }
}

watch(showModal, () => {
  if (!showModal.value) {
    deposit.value = false
  }
})

user.$subscribe((mutation) => {
  if(mutation.type === 'patch object' && mutation.payload.loggedIn === true) {
    tags.loadTags()
  }
})

onMounted( () => {
  if (user.loggedIn && !transactions.data) {
    transactions.loadTransactions()
  }
})


</script>
<style>
.transaction-button {
  @apply ml-auto h-20 sm:h-12 m-auto w-1/2 sm:w-auto sm:px-4 justify-center text-xl sm:text-lg
}
</style>