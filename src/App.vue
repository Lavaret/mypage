<template>
  <router-view></router-view>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import FooterComponent from '@/components/FooterComponent';
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
  height: 100vh;
}

a {
  cursor: pointer;
}

</style>
