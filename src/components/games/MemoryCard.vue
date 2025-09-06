<template>
  <div 
    class="memory-card w-24 h-24 cursor-pointer perspective-1000 transition-all duration-300"
    :class="{ 
      'cursor-not-allowed': disabled || isMatched || isFlipped,
      'scale-105': isFlipped && !isMatched,
      'opacity-75 scale-110': isMatched
    }"
    @click="handleClick"
  >
    <div 
      class="card-inner w-full h-full relative transition-transform duration-500 transform-style-preserve-3d"
      :class="{ 'rotate-y-180': isFlipped || isMatched }"
    >
      <!-- Card Back -->
      <div class="card-face card-back absolute w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center text-stone-200 text-3xl font-bold shadow-xl backface-hidden hover:from-gray-600 hover:to-gray-700 transition-all duration-200 border border-gray-600">
        <div class="text-shadow">?</div>
      </div>
      <!-- Card Front -->
      <div 
        class="card-face card-front absolute w-full h-full rounded-lg flex items-center justify-center text-5xl shadow-xl backface-hidden rotate-y-180 transition-all duration-200"
        :class="{
          'bg-green-900 border-2 border-green-400': isMatched,
          'bg-gray-400 border-2 border-gray-600': !isMatched
        }"
      >
        <div class="animate-bounce-subtle" :class="{ 'animate-pulse': isMatched }">
          {{ emoticon }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  emoticon: {
    type: String,
    required: true
  },
  isFlipped: {
    type: Boolean,
    default: false
  },
  isMatched: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['card-clicked'])

const handleClick = () => {
  if (!props.disabled && !props.isFlipped && !props.isMatched) {
    emit('card-clicked', props.id)
  }
}
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.backface-hidden {
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(0deg);
}

.card-front {
  transform: rotateY(180deg);
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

.animate-bounce-subtle {
  animation: bounce-subtle 0.6s ease-in-out;
}

.memory-card:hover:not(.cursor-not-allowed) .card-inner {
  transform: translateY(-2px);
}
</style>
