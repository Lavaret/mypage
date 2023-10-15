<template>

  <InfoCaption class="w-5/6 m-auto max-w-5xl">
    <p class="text-xs">Photo by
      <a class="info-link " href="https://unsplash.com/@thissillygirlskitchen?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Dana DeVolk</a>
      on
      <a class="info-link" href="https://unsplash.com/photos/JBqC2n_0zHM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
    </p>
  </InfoCaption>
  <div class="bg-cover bg-center block m-auto shadow rounded relative m-6 w-5/6 h-5/6 max-w-5xl"
       :style="{'background-image':'url(/img/table.png)'}">



    <div class="p-20 w-full flex justify-center">
      <div class="question z-10 transition ease-in-out delay-150 hover:scale-125 duration-500 bg-gray-900 p-2 absolute rounded shadow text-lg m-auto rounded shadow">
        Where can you be if the compass doesn't work?
      </div>
    </div>

    <img width="250" class="compass absolute" :src="compassImage">
    <img width="26" class="compass-arrow absolute" :src="compassArrowImage">

    <div class="p-2 w-full z-10 absolute answer-input">
      <answer-input :isValid="isValid" :note="note" @providedAnswer="checkAnswer"></answer-input>
    </div>


  </div>

</template>

<script setup>

import InfoCaption from "@/components/InfoCaption";
import AnswerInput from "@/components/AnswerInput";
import compassImage from "/public/img/compass.png";
import compassArrowImage from '/public/img/compass-arrow.png';
import { compass } from "@/composables/answers";
import { ref, defineEmits } from 'vue';
import { validateAnswer } from "@/composables/validateAnswer";

let note = ref("Type your answer here:");
let previousAnswer = ref('');
const emit = defineEmits(['correctAnswer'])
let isValid = ref(null);


function checkAnswer(answer) {
  let validated = validateAnswer(answer, compass, previousAnswer.value, isValid.value, note.value);

  previousAnswer.value = validated.previousAnswer;
  isValid.value = validated.isValid;
  note.value = validated.note;

  if(validated.isValid) {
    emit('correctAnswer', 'Post Office');
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

@media screen and (max-height: 680px) {
  .answer-input {
    top: 400px;
  }

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