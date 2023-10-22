<template>
  <simple-header />
  <HelloWorld />
    <AlienTraveller/>
</template>

<script setup>

import HelloWorld from '@/components/HelloWorld.vue'
import SimpleHeader from "@/components/SimpleHeader";
import AlienTraveller from "@/components/AlienTraveller";

</script>

<style scoped>
body {
  overflow: hidden;
}
</style>