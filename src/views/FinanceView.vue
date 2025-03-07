<template>
  <div class="flex flex-col justify-center items-center h-full p-3">
    <Teleport to="#app">
      <modal-component :show="showModal" >
        <template #header>
          New transaction
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
        @logged-id="showTransactions"
    />

    <div v-if="user.loggedIn" class="flex flex-col gap-4 md:w-2/3 w-full text-left m-auto">

      <StatCard :current-amount="totalAmount" :previous-amount="1"/>
      <div>
        <ButtonComponent @click="showModal = true" size="small" class="ml-auto">
          <PlusIcon class="size-4"/>
          Add Transaction
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
import StatCard from "@/components/finance/StatCard";
import LoginComponent from "@/components/finance/LoginComponent";
import FinanceForm from "@/components/finance/FinanceForm";
import { useDatabase } from "@/composables/useDatabase";
import { userStore } from '@/store/userStore'
import { transactionStore } from "@/store/transactionStore";
import { onMounted, computed, ref } from "vue";
import ButtonComponent from "@/components/ButtonComponent";
import { PlusIcon } from "@heroicons/vue/16/solid";
import ModalComponent from "@/components/ModalComponent";
import { alertStore } from '@/store/alertStore'

const alerts = alertStore()
const user = userStore()
const transactions = transactionStore()
const showModal = ref(false);
const formRef = ref(null);

const totalAmount = computed(() => {
  let amount = 0;
  transactions.data.forEach((transaction) => {
    amount += transaction.amount
  })

  return Number(amount.toFixed(2))
})

const {
  getTransactions,
  addTransaction,
} = useDatabase();

const logout = () => {
  user.loggedIn = false
}

const showTransactions = async () => {
  const data = await getTransactions(user.data.id)

  if (data) {
    transactions.$patch({
      data: data,
    })
  }
}

const handleFormSubmit = async () => {
  const data = await addTransaction({
    ...formRef.value.formData,
    user_id: user.data.id
  })

  if (data) {
    transactions.$patch({
      data: [
          ...data,
          ...transactions.data
      ],
    })

    alerts.addSuccess('Added transaction')
    showModal.value = false
  }
}

onMounted( () => {
  if (user.loggedIn && !transactions.data) {
    showTransactions()
  }
})


</script>
<style>

</style>