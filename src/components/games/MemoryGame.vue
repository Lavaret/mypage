<template>
  <div class="memory-game max-w-3xl mx-auto p-6">
    <!-- Game Header -->
    <div class="text-center mb-8">
      <div class="flex justify-center items-center gap-6 text-lg">
        <div class="bg-gray-800 px-6 py-3 rounded-lg border border-gray-700">
          <span class="text-green-400 font-semibold">Score: {{ score }}</span>
        </div>
        <div class="bg-gray-800 px-6 py-3 rounded-lg border border-gray-700">
          <span class="text-blue-400 font-semibold">Moves: {{ moves }}</span>
        </div>
      </div>
    </div>

    <!-- Game Board -->
    <div class="grid grid-cols-4 gap-6 justify-items-center mb-8">
      <MemoryCard
        v-for="card in cards"
        :key="card.id"
        :id="card.id"
        :emoticon="card.emoticon"
        :is-flipped="card.isFlipped"
        :is-matched="card.isMatched"
        :disabled="gameDisabled"
        @card-clicked="handleCardClick"
      />
    </div>

    <!-- Game Controls -->
    <div class="text-center">
      <button 
        @click="resetGame"
        class="bg-gray-700 hover:bg-gray-600 text-stone-200 px-8 py-3 rounded-lg font-semibold transition-colors border border-gray-600 hover:border-gray-500"
      >
        New Game
      </button>
    </div>

    <!-- Win Message -->
    <div v-if="gameWon" class="text-center mt-8 p-6 bg-gray-800 rounded-lg border border-green-500">
      <h3 class="text-2xl font-bold text-green-400 mb-2">🎉 Congratulations! 🎉</h3>
      <p class="text-stone-200">You won in {{ moves }} moves with a score of {{ score }}!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import MemoryCard from './MemoryCard.vue'

// Game state
const score = ref(0)
const moves = ref(0)
const gameDisabled = ref(false)
const flippedCards = ref([])
const cards = ref([])

// Game configuration
const emoticons = ['🐱', '🐶', '🐸', '🦊', '🐼', '🐨', '🦁', '🐯']

// Computed properties
const gameWon = computed(() => {
  return cards.value.length > 0 && cards.value.every(card => card.isMatched)
})

// Initialize game
const initGame = () => {
  // Create pairs of cards
  const gameEmoticons = emoticons.slice(0, 8) // Use 8 different emoticons
  const cardPairs = [...gameEmoticons, ...gameEmoticons] // Duplicate for pairs
  
  // Shuffle cards
  const shuffled = cardPairs.sort(() => Math.random() - 0.5)
  
  // Create card objects
  cards.value = shuffled.map((emoticon, index) => ({
    id: index,
    emoticon,
    isFlipped: false,
    isMatched: false
  }))
}

// Handle card click
const handleCardClick = (cardId) => {
  if (gameDisabled.value || flippedCards.value.length >= 2) return
  
  const card = cards.value.find(c => c.id === cardId)
  if (!card || card.isFlipped || card.isMatched) return
  
  // Flip the card
  card.isFlipped = true
  flippedCards.value.push(card)
  
  // Check for match when 2 cards are flipped
  if (flippedCards.value.length === 2) {
    moves.value++
    gameDisabled.value = true
    
    setTimeout(() => {
      checkForMatch()
    }, 1000)
  }
}

// Check if flipped cards match
const checkForMatch = () => {
  const [card1, card2] = flippedCards.value
  
  if (card1.emoticon === card2.emoticon) {
    // Match found!
    card1.isMatched = true
    card2.isMatched = true
    score.value++
    
    // Add visual feedback for match
    setTimeout(() => {
      // You could add a success animation here
    }, 100)
  } else {
    // No match - flip cards back
    card1.isFlipped = false
    card2.isFlipped = false
  }
  
  // Reset for next turn
  flippedCards.value = []
  gameDisabled.value = false
}

// Reset game
const resetGame = () => {
  score.value = 0
  moves.value = 0
  flippedCards.value = []
  gameDisabled.value = false
  initGame()
}

// Initialize game on component mount
onMounted(() => {
  initGame()
})
</script>