<template>

  <div class="bg-cover bg-center block m-auto shadow rounded relative m-6 w-5/6 h-5/6"
       :style="{'background-image':'url(/img/table.png)'}">

    <InfoCaption>
      <p class="text-xs">Photo by
        <a class="info-link " href="https://unsplash.com/@thissillygirlskitchen?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Dana DeVolk</a>
        on
        <a class="info-link" href="https://unsplash.com/photos/JBqC2n_0zHM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      </p>
    </InfoCaption>

    <div class="pt-20">
      <div class="question bg-gray-900 p-1 text-lg m-auto rounded shadow">Where can you be if the compass works this way?</div>
    </div>

    <img width="250" class="compass absolute shadow" :src="compassImage">
    <img width="26" class="compass-arrow absolute" :src="compassArrowImage">

    <div class="p-2 w-full absolute answer-input">
      <div class="bg-gray-900 rounded shadow p-2">
        <p :class="{'text-green-500' : answer !== '' && isValid === true, 'text-red-500' : answer !== '' && isValid === false}" class="text-left w-full">{{note}}</p>
        <input @keydown.enter="checkAnswer" v-model="answer" class="bg-gray-800 h-8 w-full p-2 rounded shadow">
      </div>
    </div>


  </div>

</template>

<script setup>

import InfoCaption from "@/components/InfoCaption";
import compassImage from "/public/img/compass.png";
import compassArrowImage from '/public/img/compass-arrow.png';
import { ref } from 'vue';

let answer = ref('');
let note = ref("Type your answer here:");
let isValid = ref(null);

function checkAnswer() {
  let newAnswer = answer.value;
  if(newAnswer.toLowerCase().replace(/\s/g, "").includes('pole')) {
    note.value = "Great";
    isValid.value = true;
  } else {
    note.value = "Try again";
    isValid.value = false;
  }
}


</script>

<style scoped>
.info-link {
  @apply hover:underline underline-offset-2;
}

.answer-input {
  top: 70vh;
}

.compass {
  top: calc(33vh - 53px);
  left: calc(50% - 125px);
}

.question {
  max-width: 73%;
}

.compass-arrow {
  top: calc(33vh - 71px + 125px);
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
</style>