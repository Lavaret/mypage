<script setup>
import { ref, computed } from 'vue'

// Game board state - 5 rows x 4 columns = 20 positions
// 0 = empty, 1 = yellow, 2 = red (2-block), 3 = blue (4-block)
const board = ref([
  [2, 2, 1, 1], // Row 1: red block (spans 2), yellow, yellow
  [2, 2, 1, 1], // Row 2: red block (spans 2), yellow, yellow
  [3, 3, 2, 2], // Row 3: blue block (spans 2), red block (spans 2)
  [3, 3, 2, 2], // Row 4: blue block (spans 2), red block (spans 2)
  [0, 0, 2, 2]  // Row 5: 2 gaps, red block (spans 2)
])

// Generate visual blocks based on the board state
const blocks = computed(() => {
  const result = []
  const processed = new Set()
  
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 4; col++) {
      const key = `${row}-${col}`
      if (processed.has(key)) continue
      
      const cellValue = board.value[row][col]
      
      if (cellValue === 0) {
        // Empty space (gap)
        result.push({
          id: `gap-${row}-${col}`,
          type: 'gap',
          row,
          col,
          width: 1,
          height: 1,
          color: ''
        })
        processed.add(key)
      } else if (cellValue === 1) {
        // Yellow single block
        result.push({
          id: `yellow-${row}-${col}`,
          type: 'single',
          row,
          col,
          width: 1,
          height: 1,
          color: 'bg-yellow-500 border-yellow-600'
        })
        processed.add(key)
      } else if (cellValue === 2) {
        // Red 2-block (check direction)
        let width = 1, height = 1
        
        // Check if it spans horizontally
        if (col < 3 && board.value[row][col + 1] === 2) {
          width = 2
          processed.add(`${row}-${col + 1}`)
        }
        // Check if it spans vertically
        else if (row < 4 && board.value[row + 1][col] === 2) {
          height = 2
          processed.add(`${row + 1}-${col}`)
        }
        
        result.push({
          id: `red-${row}-${col}`,
          type: 'double',
          row,
          col,
          width,
          height,
          color: 'bg-red-500 border-red-600'
        })
        processed.add(key)
      } else if (cellValue === 3) {
        // Blue 4-block
        result.push({
          id: `blue-${row}-${col}`,
          type: 'quad',
          row,
          col,
          width: 2,
          height: 2,
          color: 'bg-blue-500 border-blue-600'
        })
        // Mark all 4 positions as processed
        processed.add(key)
        processed.add(`${row}-${col + 1}`)
        processed.add(`${row + 1}-${col}`)
        processed.add(`${row + 1}-${col + 1}`)
      }
    }
  }
  
  return result
})

// Handle block selection and movement
const selectedBlock = ref(null)
const isDragging = ref(false)
const draggedBlock = ref(null)
const dragStartTime = ref(0)

const selectBlock = (block, event) => {
  console.log(block, eventc)
  if (block.type === 'gap') return
  
  // Prevent selection if this was part of a drag operation
  const timeSinceDragStart = Date.now() - dragStartTime.value
  if (timeSinceDragStart < 200) return
  
  // Toggle selection
  selectedBlock.value = selectedBlock.value?.id === block.id ? null : block
}

// Drag and drop functions
const handleDragStart = (event, block) => {
  if (block.type === 'gap') return
  
  dragStartTime.value = Date.now()
  isDragging.value = true
  draggedBlock.value = block
  selectedBlock.value = block
  
  // Set drag data
  event.dataTransfer.setData('text/plain', block.id)
  event.dataTransfer.effectAllowed = 'move'
}

const handleDragEnd = () => {
  isDragging.value = false
  draggedBlock.value = null
}

const handleDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

const handleDrop = (event, targetRow, targetCol) => {
  event.preventDefault()
  
  if (!draggedBlock.value) return
  
  const block = draggedBlock.value
  
  // Check if the move is valid
  if (isValidMove(block, targetRow, targetCol)) {
    moveBlock(block, targetRow, targetCol)
  }
  
  handleDragEnd()
}

// Check if a move is valid
const isValidMove = (block, targetRow, targetCol) => {
  // Check bounds
  if (targetRow < 0 || targetRow > 4 || targetCol < 0 || targetCol > 3) return false
  if (targetRow + block.height > 5 || targetCol + block.width > 4) return false
  
  // Check if target area is available (excluding the block's current position)
  for (let r = targetRow; r < targetRow + block.height; r++) {
    for (let c = targetCol; c < targetCol + block.width; c++) {
      // Skip if this is the block's current position
      if (r >= block.row && r < block.row + block.height && 
          c >= block.col && c < block.col + block.width) {
        continue
      }
      
      // Check if the target cell is occupied
      if (board.value[r][c] !== 0) return false
    }
  }
  
  return true
}

// Move a block to a new position
const moveBlock = (block, newRow, newCol) => {
  // Clear the block's current position
  for (let r = block.row; r < block.row + block.height; r++) {
    for (let c = block.col; c < block.col + block.width; c++) {
      board.value[r][c] = 0
    }
  }
  
  // Place the block in the new position
  const blockValue = block.type === 'single' ? 1 : block.type === 'double' ? 2 : 3
  for (let r = newRow; r < newRow + block.height; r++) {
    for (let c = newCol; c < newCol + block.width; c++) {
      board.value[r][c] = blockValue
    }
  }
}

// Get drop zone style for visual feedback
const getDropZoneClass = (row, col) => {
  if (!isDragging.value || !draggedBlock.value) return ''
  
  const block = draggedBlock.value
  const isValid = isValidMove(block, row, col)
  
  // Only show visual feedback for empty cells or cells currently occupied by the dragged block
  const currentCell = board.value[row][col]
  const isCurrentBlockPosition = (row >= block.row && row < block.row + block.height && 
                                 col >= block.col && col < block.col + block.width)
  
  // Show feedback only on empty spaces or current block position
  if (currentCell === 0 || isCurrentBlockPosition) {
    return isValid ? 'drop-zone-valid' : 'drop-zone-invalid'
  }
  
  return ''
}

const getBlockStyle = (block) => {
  const baseStyle = {
    gridColumn: `${block.col + 1} / span ${block.width}`,
    gridRow: `${block.row + 1} / span ${block.height}`,
  }
  
  if (block.type === 'gap') {
    return {
      ...baseStyle,
      backgroundColor: 'transparent',
      minHeight: '80px'
    }
  }
  
  return baseStyle
}

</script>

<template>
  <div class="flex justify-center">
    <div class="game-box min-w-[400px] min-h-[50vh] bg-gray-300 border-gray-400 border-2 rounded-lg p-3 flex flex-col gap-3">
      <div class="game-nav h-24 bg-gray-400 rounded-lg flex items-center justify-center">
        <h2 class="text-xl font-bold text-gray-800">Slide Box Game</h2>
      </div>
      
      <div class="game-container relative">
        <!-- Game board grid -->
        <div class="board-grid grid grid-cols-4 grid-rows-5 gap-2 p-4 bg-gray-600 rounded-lg" :class="{ 'dragging': isDragging }">
          <!-- Render blocks -->
          <div
            v-for="block in blocks"
            :key="block.id"
            :class="[
              'game-block rounded-lg transition-all duration-200 cursor-pointer border-2 select-none',
              block.color,
              {
                'ring-4 ring-white ring-opacity-70': selectedBlock?.id === block.id,
                'hover:scale-105': block.type !== 'gap' && !isDragging.value,
                'opacity-20 bg-gray-500': block.type === 'gap',
                'opacity-50 scale-95': isDragging.value && draggedBlock.value?.id === block.id,
                'cursor-grabbing': isDragging.value && draggedBlock.value?.id === block.id,
                'cursor-grab': block.type !== 'gap' && !isDragging.value
              }
            ]"
            :style="getBlockStyle(block)"
            @click="(e) => selectBlock(block, e)"
            :draggable="block.type !== 'gap'"
            @dragstart="(e) => handleDragStart(e, block)"
            @dragend="handleDragEnd"
          >
            <div v-if="block.type !== 'gap'" class="w-full h-20 flex items-center justify-center">
              <span class="text-white font-bold text-sm">
                {{ block.type === 'single' ? '1x1' : 
                   block.type === 'double' ? '2x1' : 
                   '2x2' }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Invisible overlay with drop targets -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="grid grid-cols-4 grid-rows-5 gap-2 p-4 h-full w-full">
            <div
              v-for="(row, rowIndex) in board"
              :key="'row-'+rowIndex"
              class="contents"
            >
              <div
                v-for="(cell, colIndex) in row"
                :key="'cell-'+rowIndex+'-'+colIndex"
                class="drop-cell pointer-events-auto rounded relative"
                :class="getDropZoneClass(rowIndex, colIndex)"
                @dragover="handleDragOver"
                @drop="(e) => handleDrop(e, rowIndex, colIndex)"
              />
            </div>
          </div>
        </div>
        
        <!-- Game info -->
        <div class="mt-4 text-center text-gray-700">
          <p v-if="isDragging" class="text-sm font-semibold text-blue-600">
            🎯 Dragging {{ draggedBlock.type }} block - Drop in a valid position!
          </p>
          <p v-else-if="selectedBlock" class="text-sm">
            Selected: {{ selectedBlock.type }} block ({{ selectedBlock.color.includes('red') ? 'Red' : 
                                                       selectedBlock.color.includes('blue') ? 'Blue' : 
                                                       'Yellow' }}) - Click and drag to move
          </p>
          <p v-else class="text-sm text-gray-500">
            Click on a colored block to select it, then drag to move
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-block {
  min-height: 80px;
}

.board-grid {
  aspect-ratio: 4/5;
  max-width: 400px;
  margin: 0 auto;
}

/* Ensure proper grid sizing */
.board-grid > * {
  min-height: 0;
  min-width: 0;
}

.drop-cell {
  min-height: 80px;
  transition: all 0.2s ease;
}

.drop-zone-valid {
  background-color: rgba(34, 197, 94, 0.2); /* green-500 with opacity */
  border: 2px dashed #22c55e; /* green-500 */
  border-radius: 8px;
}

.drop-zone-invalid {
  background-color: rgba(239, 68, 68, 0.2); /* red-500 with opacity */
  border: 2px dashed #ef4444; /* red-500 */
  border-radius: 8px;
}

/* Add visual feedback when dragging */
.board-grid {
  transition: all 0.3s ease;
}

.board-grid.dragging {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  transform: scale(1.02);
}
</style>
