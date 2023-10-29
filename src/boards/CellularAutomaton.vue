<template>
  <div ref="board" class="w-full h-full">
    CellularAutomaton
    <div class="unit"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const boardHeight = window.screen.height;
const boardWidth = window.screen.width;
const board = ref(null)

onMounted(() => {
  let a1 = new Unit(100, 100);
  a1.move();
})

class Unit {
  w = 0;
  h = 0;
  l = 'unit';
  o;

  constructor(w, h) {
    this.o = document.createElement("div");
    this.o.classList = this.l;
    this.o.style.cssText += 'position:absolute;background-color:white;width:1px;height:1px;';
    this.o.style["top"] = w + 'px';
    this.o.style["left"] = h + 'px';

    board.value.appendChild(this.o);

    this.w = w;
    this.h = h;
  }

  move() {
    this.w += getRandomInt(3);
    this.h += getRandomInt(3);
    console.log('moved');

    this.show();

    if(this.h > boardHeight || this.w > boardWidth) {
     this.die();
    } else {
      setTimeout(() => {
        this.move();
      }, 300)
    }
  }

  show() {
    this.o.style["top"] = this.w + 'px';
    this.o.style["left"] = this.h + 'px';
  }

  die() {
    console.log('died');
    //this.o.style['display'] = "none";
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

</script>

<style scoped>
.unit {
  position: absolute;
  width: 1px;
  height: 1px;
  background-color: white;
}
</style>