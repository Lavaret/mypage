<template>
  <SimpleHeader />
  <Teleport to="#app">
    <modal-component :show="showModal" >
      <template #header>
        Congratulations!
      </template>
      <template #default>
        You solved the riddle! Next one is called "{{next}}".
      </template>
      <template #footer>
        <button class="modal-button" @click="setLevel">Go</button>
        <button class="modal-button" @click="showModal = false">Cancel</button>
      </template>
    </modal-component>
  </Teleport>

  <CompassGame @correctAnswer="openModal" v-if="level === 'North Pole'"/>
  <StampGame v-if="level === 'Post Office'"></StampGame>
</template>

<script setup>
import SimpleHeader from "@/components/SimpleHeader";
import CompassGame from "@/games/CompassGame";
import { useStorage } from "@/composables/useStorage";
import ModalComponent from "@/components/ModalComponent";
import { ref } from 'vue';
import StampGame from "@/games/StampGame";

let level = useStorage('level', 'North Pole');
let showModal = ref(false);
let next = ref('');

function openModal(val) {
  next.value = val;
  console.log(next.value);
  showModal.value = true;
}

function setLevel() {
  level.value = next.value;
  showModal.value = false;
}

</script>

<style scoped>
.modal-button {
  @apply rounded shadow bg-gray-800 font-bold hover:bg-gray-700 p-2;
}
</style>