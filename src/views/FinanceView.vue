<template>
  <div class="flex flex-col justify-center items-center h-full p-3">

    <LoginComponent v-if="!user.loggedIn" @login="(username, password) => handleLogin(username, password)"/>

    <div v-if="user.loggedIn" class="flex flex-col gap-4 md:w-2/3 w-full text-left m-auto">
      <StatCard :current-amount="totalAmount" :previous-amount="1"/>
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
import { useDatabase } from "@/composables/useDatabase";
import { userStore } from '@/store/userStore'
import { transactionStore } from "@/store/transactionStore";
import { onMounted, computed } from "vue";

const user = userStore()
const transactions = transactionStore()

const totalAmount = computed(() => {
  let amount = 0;
  transactions.data.forEach((transaction) => {
    amount += transaction.amount
  })

  return Number(amount.toFixed(2))
})

const { login, getTransactions } = useDatabase();

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

onMounted( () => {
  if (user.loggedIn && !transactions.data) {
    showTransactions()
  }
})


</script>
<style>

</style>