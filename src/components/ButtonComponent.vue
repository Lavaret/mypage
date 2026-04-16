<template>
  <button
    :disabled="disabled"
    class="btn"
    :class="[
      `btn--${type}`,
      `btn--${size}`,
      { 'btn--disabled': disabled }
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'normal'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.btn {
  @apply transition duration-300 ease-out shadow rounded-md flex gap-1 items-center;
  color: #000;
  border: 2px double black;
}

.btn:active:not(--disabled) { 
  box-shadow: none;
  margin-top: 5px;
  margin-left: -1px;
}

/* Types */
.btn--primary {
  background-color: rgb(255, 185, 207)
}
.btn--primary:hover {
  background-color: rgb(232, 167, 189)
}

.btn--secondary {
  @apply bg-green-500 border-green-600;
}
.btn--secondary:hover {
  @apply bg-green-600 border-green-700;
}

.btn--positive {
  @apply bg-yellow-600 border-yellow-700;
}
.btn--positive:hover {
  @apply bg-yellow-500 border-yellow-600;
}

/* Sizes */
.btn--normal {
  @apply p-3 text-lg;
}

.btn--small {
  @apply py-1 px-2 text-sm;
}

/* State */
.btn--disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>