<template>
  <Transition
    enter-from-class="opacity-0 scale-125"
    enter-to-class="opacity-100 scale-100"
    enter-active-class="transition duration-300"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-125"
    leave-active-class="transition duration-200"
  >
    <div v-if="show" class="modal-mask z-20">
      <div class="modal-container rounded-md shadow">
        <header class="w-full text-left text-lg p-2 bg-gray-800 rounded-t-md shadow">
          <slot name="header">Header</slot>
        </header>
        <div class="w-full text-left p-2">
          <slot></slot>
        </div>
        <footer class="flex gap-2 justify-end p-2 ">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  show: Boolean,
})

</script>

<style scoped>
.modal-mask {
  position: fixed;
  background: rgba(0, 0, 0, .6);
  inset: 0;
  display: grid;
  place-items: center;
}

.modal-container {
  @apply bg-gray-900;
  width: 60vw;
  max-width: 500px;
  min-width: 200px;
}
</style>