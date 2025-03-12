<template>
  <div class="">
    <button @click="handleShowMenu" data-test="action-button" ref="target" class="hover:bg-gray-900 p-1 rounded">
      <slot name="trigger"/>
    </button>
    <div
        class="absolute min-w-35 z-10 mt-2 rounded-md border border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
        :style="{ top: `${posY}px`, left: `${posX}px` }"
        role="menu"
        v-if="showMenu"
    >
      <div class="p-2 flex flex-col items-end gap-1">
        <slot name="content"/>
      </div>
    </div>
  </div>

</template>

<script setup>
import { onClickOutside } from "@vueuse/core"
import { useMouse } from '@vueuse/core'
import { ref, useTemplateRef } from "vue";

const showMenu = ref(false);
const target = useTemplateRef('target')
const { x, y, sourceType } = useMouse()
const posX = ref(0)
const posY = ref(0)



const handleShowMenu = () => {
  showMenu.value = !showMenu.value
  posX.value = x.value - 110;
  posY.value = y.value + 15;
}

onClickOutside(target, () => {
  if (showMenu.value) {
    showMenu.value = false
  }
})
</script>

<style scoped>

</style>