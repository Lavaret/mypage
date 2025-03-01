<template>
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

  <div class="flex flex-col gap-[3rem] p-2">
    <div class="min-h-[500px]">
      <CompassGame @nextLevel="openModal" v-if="level === 'North Pole'"/>
      <StampGame @nextLevel="openModal" v-if="level === 'Post Office'"></StampGame>
      <FaraonGame @nextLevel="openModal" v-if="level === 'Faraon'"></FaraonGame>
      <UnderConstruction v-if="level === 'Octopus'">There will be octopus game! 🐙</UnderConstruction>
      <UnderConstruction v-if="level === 'Aliens'">There will be aliens game! 👽</UnderConstruction>
      <UnderConstruction v-if="level === 'Sea King'">There will be sea king game! 🗺️</UnderConstruction>
    </div>

    <div class="flex mx-auto w-full md:w-2/3 justify-between">
      <div>
        <ButtonComponent @click="previousGame" v-if="level !== 'North Pole'">
          <div class="flex gap-3 justify-center items-center">
            <ArrowLeftIcon class="size-4"/>
            <span>Previous</span>
          </div>
        </ButtonComponent>
      </div>
      <div>
        <ButtonComponent @click="nextGame" v-if="level !== 'Sea King'">
          <div class="flex gap-3 justify-center items-center">
            <span>Next</span>
            <ArrowRightIcon class="size-4"/>
          </div>
        </ButtonComponent>
      </div>
    </div>
  </div>

</template>

<script setup>
import CompassGame from "@/components/games/CompassGame";
import UnderConstruction from '@/components/games/UnderConstruction';
import { useStorage } from "@/composables/useStorage";
import ModalComponent from "@/components/ModalComponent";
import { ref } from 'vue';
import StampGame from "@/components/games/StampGame";
import FaraonGame from "@/components/games/FaraonGame";
import ButtonComponent from "@/components/ButtonComponent";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/16/solid"

let level = useStorage('level', 'North Pole');
let showModal = ref(false);
let next = ref('');

const GAMES = ['North Pole', 'Post Office', 'Faraon', 'Octopus', 'Aliens', 'Sea King']

const previousGame = () => {
  const currentIndex = GAMES.indexOf(level.value)
  level.value = GAMES[currentIndex - 1]
}

const nextGame = () => {
  const currentIndex = GAMES.indexOf(level.value)
  level.value = GAMES[currentIndex + 1]
}

function openModal(val) {
  next.value = val;
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