<template>
  <div class="flex flex-col justify-center items-center h-full">

    <LoginComponent v-if="!loggedIn"/>

    <div v-if="loggedIn" class="flex flex-col gap-4 w-1/2 text-left m-auto">
      <StatCard :current-amount="1000" :previous-amount="800"/>
      <FinanceList />
    </div>

  </div>


</template>
<script setup>

import FinanceList from "@/components/finance/FinanceList";
import StatCard from "@/components/finance/StatCard";
import LoginComponent from "@/components/finance/LoginComponent";
// import { createClient } from 'jsr:@supabase/supabase-js@2'


// console.log(supabaseUrl, supabaseKey);

// const supabase = createClient(supabaseUrl, supabaseKey);

const loggedIn = false
</script>
<style>

</style>