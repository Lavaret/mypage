<template>
  <Teleport to="#app">
      <AlertContainer
          v-show="alerts.all.length"
      >
        <AlertComponent
            v-for="alert in alerts.all"
            :id="alert.id"
            :type="alert.type"
            @close-alert="alerts.removeAlert(alert.id)"
        >
          {{ alert.message }}
        </AlertComponent>
      </AlertContainer>
  </Teleport>

  <div class="flex flex-col justify-between">
    <SimpleHeader/>
    <router-view></router-view>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script setup>
import FooterComponent from '@/components/FooterComponent';
import SimpleHeader from "@/components/SimpleHeader";
import AlertComponent from "@/components/AlertComponent";
import AlertContainer from "@/components/AlertContainer";
import { alertStore } from '@/store/alertStore'

const alerts = alertStore()
</script>

<style>
:root {
  @apply bg-gradient-to-r from-[#222630] to-[#333742];
}
body {
  height: 100vh;
}

a {
  cursor: pointer;
}

</style>
