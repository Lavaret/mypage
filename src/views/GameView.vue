<template>
  <SimpleHeader />
  <modal-component :show="showModal">
    <template #header>
      Congratulations!
    </template>
    <template #default>
      You solved the riddle! Next one is called "{{next}}".
    </template>
    <template #footer>
      <button class="modal-button">Go</button>
      <button class="modal-button" @click="showModal = false">Cancel</button>
    </template>
  </modal-component>
  <CompassGame @correctAnswer="openModal" v-if="level === 'North Pole'"/>
</template>

<script setup>
import SimpleHeader from "@/components/SimpleHeader";
import CompassGame from "@/games/CompassGame";
import { useStorage } from "@/composables/useStorage";
import ModalComponent from "@/components/ModalComponent";
import { ref } from 'vue';

let level = useStorage('level', 'North Pole');
let showModal = ref(false);
let next = ref('');

function openModal(val) {
  next.value = val;
  console.log(next.value);
  showModal.value = true;
}

</script>

<style scoped>
.modal-button {
  @apply rounded shadow bg-gray-800 font-bold hover:bg-gray-700 p-2;
}
</style>