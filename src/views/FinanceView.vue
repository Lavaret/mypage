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

    <Teleport to="#app">
      <AlertComponent
          v-show="showAlert"
          type="error"
          @close-alert="showAlert = false"
      >
        {{ error }}
      </AlertComponent>
    </Teleport>
    
    <LoginComponent v-if="!user.loggedIn" @login="(username, password) => handleLogin(username, password)"/>

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
import { onMounted, computed } from "vue";
import ButtonComponent from "@/components/ButtonComponent";
import { PlusIcon } from "@heroicons/vue/16/solid";
import ModalComponent from "@/components/ModalComponent";
import { ref, watch } from 'vue';
import AlertComponent from "@/components/AlertComponent";

const user = userStore()
const transactions = transactionStore()
const showModal = ref(false);
const showAlert = ref(false);
const formRef = ref(null);

const totalAmount = computed(() => {
  let amount = 0;
  transactions.data.forEach((transaction) => {
    amount += transaction.amount
  })

  return Number(amount.toFixed(2))
})

const {
  login,
  getTransactions,
  addTransaction,
  error,
} = useDatabase();

const logout = () => {
  user.loggedIn = false
}

const handleLogin = async (username, password) => {

  const data = await login(username, password)

  if (data) {
    user.$patch({
      data: data.user,
      loggedIn: true,
      access_token: data.session.access_token,
      expires_in: data.session.expires_in,
      expires_at: data.session.expires_at,
    })

    showTransactions()
  }
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

    showModal.value = false
  }
}

onMounted( () => {
  if (user.loggedIn && !transactions.data) {
    showTransactions()
  }
})

watch(error, () => {
  if (error.value) {
    showAlert.value = true;

    setTimeout(() => {
      showAlert.value = false;
      error.value = ''
    }, 3690)
  }
})


</script>
<style>

</style>