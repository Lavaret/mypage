<template>
  <div class="flex flex-col justify-between">
    <SimpleHeader/>
    <router-view></router-view>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script setup>
import FooterComponent from '@/components/FooterComponent';
import SimpleHeader from "@/components/SimpleHeader";
</script>

<style>
body {
  background-color: #222630;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: antiquewhite;
}

a {
  cursor: pointer;
}

</style>
