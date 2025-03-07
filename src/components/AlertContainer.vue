<template>
  <Transition
      enter-from-class="translate-x-[150%]"
      enter-to-class="translate-x-[0%]"
      enter-active-class="transition duration-300 ease-in-out"
      leave-from-class="translate-x-[0%]"
      leave-to-class="translate-x-[150%]"
  >
    <div class="fixed right-2 text-left z-50 top-[3rem] flex flex-col gap-2">
      <slot />
    </div>
  </Transition>
</template>

<script setup>

</script>

<style scoped>

</style>