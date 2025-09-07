<template>
  <div class="memory-game max-w-3xl mx-auto px-4 sm:px-6">
    <!-- Game Header -->
    <div class="text-center mb-6 sm:mb-8">
      <div class="flex flex-row justify-center items-center gap-3 sm:gap-6 text-base sm:text-lg">
        <div class="bg-gray-800 px-4 py-2 sm:px-6 sm:py-3 rounded-lg border border-gray-700">
          <span class="text-green-400 font-semibold">Score: {{ score }}</span>
        </div>
        <div class="bg-gray-800 px-4 py-2 sm:px-6 sm:py-3 rounded-lg border border-gray-700">
          <span class="text-blue-400 font-semibold">Moves: {{ moves }}</span>
        </div>
      </div>
    </div>

    <!-- Game Board -->
    <div class="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 justify-items-center mb-6 sm:mb-8 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
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
        class="bg-gray-700 hover:bg-gray-600 text-stone-200 px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold transition-colors border border-gray-600 hover:border-gray-500 text-sm sm:text-base"
      >
        New Game
      </button>
    </div>

    <!-- Win Message -->
    <div v-if="gameWon" class="text-center mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-800 rounded-lg border border-green-500">
      <h3 class="text-xl sm:text-2xl font-bold text-green-400 mb-2">🎉 Congratulations! <span class="flip">🎉</span></h3>
      <p class="text-sm sm:text-base text-stone-200">You won in {{ moves }} moves with a score of {{ score }}!</p>
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
const emoticons = [
  // Animals
  '🐱', '🐶', '🐸', '🦊', '🐼', '🐨', '🦁', '🐯', '🐮', '🐷',
  '🐵', '🐒', '🦆', '🐧', '🐔', '🐣', '🐤', '🐥', '🦅', '🦉',
  '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞',
  '🐜', '🦗', '🕷️', '🦂', '🐢', '🐍', '🦎', '🐙', '🦑', '🦐',
  '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅',
  // Food & Drinks
  '🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒',
  '🥭', '🍑', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥒', '🌶️',
  '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🥖', '🍞', '🥨',
  // Objects & Symbols
  '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🎱', '🪀',
  '🏓', '🏸', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋',
  '🎪', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🪘', '🎷',
  '🎺', '🪗', '🎸', '🪕', '🎻', '🎲', '♠️', '♥️', '♦️', '♣️'
]

// Computed properties
const gameWon = computed(() => {
  return cards.value.length > 0 && cards.value.every(card => card.isMatched)
})

// Initialize game
const initGame = () => {
  // Randomly select 8 emoticons from the full collection
  const shuffledEmoticons = [...emoticons].sort(() => Math.random() - 0.5)
  const gameEmoticons = shuffledEmoticons.slice(0, 8)
  
  // Create pairs of cards
  const cardPairs = [...gameEmoticons, ...gameEmoticons] // Duplicate for pairs
  
  // Shuffle the card pairs
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
    }, 600)
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
      // Add success animation classes
      const card1Element = document.querySelector(`[data-card-id="${card1.id}"]`)
      const card2Element = document.querySelector(`[data-card-id="${card2.id}"]`)
      
      if (card1Element && card2Element) {
        // Add success animation classes with slight delay for second card
        card1Element.classList.add('match-success')
        
        setTimeout(() => {
          card2Element.classList.add('match-success')
        }, 50)
        
        // Create floating score indicator
        createFloatingScore(card1Element)
        
        // Remove animation classes after animation completes
        setTimeout(() => {
          card1Element.classList.remove('match-success')
          card2Element.classList.remove('match-success')
        }, 800)
      }
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

// Create floating score animation
const createFloatingScore = (cardElement) => {
  const floatingScore = document.createElement('div')
  floatingScore.textContent = '+1'
  floatingScore.className = 'floating-score'
  floatingScore.style.cssText = `
    position: absolute;
    color: #22c55e;
    font-weight: bold;
    font-size: 1.2rem;
    pointer-events: none;
    z-index: 1000;
    animation: floatUp 1s ease-out forwards;
  `
  
  // Position relative to the card
  const rect = cardElement.getBoundingClientRect()
  floatingScore.style.left = rect.left + rect.width/2 - 10 + 'px'
  floatingScore.style.top = rect.top - 10 + 'px'
  
  document.body.appendChild(floatingScore)
  
  // Remove after animation
  setTimeout(() => {
    if (floatingScore.parentNode) {
      floatingScore.parentNode.removeChild(floatingScore)
    }
  }, 1000)
}

// Reset game
const resetGame = () => {
  // First, flip all cards face down to hide emoticons
  cards.value.forEach(card => {
    card.isFlipped = false
    card.isMatched = false
  })
  
  // Reset game state
  score.value = 0
  moves.value = 0
  flippedCards.value = []
  gameDisabled.value = true // Disable during reset
  
  // Wait a bit for the flip animation to complete, then initialize new game
  setTimeout(() => {
    initGame()
    gameDisabled.value = false
  }, 300) // Match this with your card flip animation duration
}

// Initialize game on component mount
onMounted(() => {
  initGame()
})
</script>

<style>
@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px) scale(1.2);
  }
}

.flip {
  transform: scaleX(-1);
  display: inline-block;
}
</style>
