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

  <div class="flex flex-col justify-between" data-theme="dark">
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
body {
  background-color: #222630;
  height: 100vh;
}

a {
  cursor: pointer;
}

</style>
