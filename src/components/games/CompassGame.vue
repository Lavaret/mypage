<template>
  <game-component :loaded="loaded">
    <template #question>
      Where can you be if the compass doesn't work?
    </template>
    <template #game-content>
      <InfoCaption class="mx-3">
        <p class="text-xs">Photo by
          <a class="info-link " href="https://unsplash.com/@thissillygirlskitchen?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Dana DeVolk</a>
          on
          <a class="info-link" href="https://unsplash.com/photos/JBqC2n_0zHM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
        </p>
      </InfoCaption>

      <div class="bg-cover bg-center table-background block m-auto shadow rounded relative mx-3"
           :style="{'background-image':'url(/img/table.png)'}">

        <img width="250" alt="compass-image" class="compass absolute" @load="handleLoadImage" :src="compassImage">
        <img width="26" alt="compass-arrow" class="compass-arrow absolute" @load="handleLoadImage" :src="compassArrowImage">

      </div>
    </template>
    <template #answers>
      <answer-input :answers="compass" @correctAnswer="goToNextLevel()"></answer-input>
    </template>
  </game-component>

</template>

<script setup>

import InfoCaption from "@/components/InfoCaption";
import AnswerInput from "@/components/AnswerInput";
import compassImage from "@/img/compass.png";
import compassArrowImage from '@/img/compass-arrow.png';
import { compass } from "@/composables/answers";
import { ref } from 'vue';
import GameComponent from "@/components/games/GameComponent";

const emit = defineEmits(['nextLevel']);

const loaded = ref(false)

let imageLoaderCounter = ref(0);

const handleLoadImage = () => {
  imageLoaderCounter.value++
  if (imageLoaderCounter.value === 2) {
    setTimeout(() => {
      loaded.value = true;
    }, 500)
  }
}

function goToNextLevel() {
  emit('nextLevel', 'Post Office');
}


</script>

<style scoped>

.info-link {
  @apply hover:underline underline-offset-2;
}

.compass {
  top: calc(12vh - 53px);
  left: calc(50% - 125px);
}

.table-background {
  min-height: 400px;
}

.compass-arrow {
  top: calc(12vh - 71px + 125px);
  left: calc(50% - 13px);
  animation: compass-spin 5s ease-in infinite;
}

@keyframes compass-spin {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(80deg);
  }
  20% {
    transform: rotate(60deg);
  }
  30% {
    transform: rotate(100deg);
  }
  40% {
    transform: rotate(120deg);
  }
  50% {
    transform: rotate(100deg);
  }
  60% {
    transform: rotate(180deg);
  }
  70% {
    transform: rotate(200deg);
  }
  80% {
    transform: rotate(240deg);
  }
  80% {
    transform: rotate(220deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-height: 680px) {

  div.bg-cover {
    min-height: 500px;
  }

  .compass {
    top: 103px;
  }

  .compass-arrow {
    top: 208px;
  }

}
</style>