<template>
  <div ref="board" class="w-full h-full">
    CellularAutomaton
    <button @click="killAnimal">Kill</button>
    <div ref="unit" class="unit"></div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useLife} from "@/composables/life";

const unit = ref(null);

const {killAnimal}  = useLife(unit);

</script>

<style scoped>
.unit {
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: white;
}
</style>