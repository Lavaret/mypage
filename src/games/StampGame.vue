<template>
<div class="w-full">

  <div class="mb-5 w-full flex justify-center">
    <div class="m-1 question z-10 transition ease-in-out delay-150 hover:scale-125 duration-500 bg-gray-900 p-2 rounded shadow text-lg m-auto">
      A secret message is hidden on this letter. Can you read it?
    </div>
  </div>

  <InfoCaption class="caption w-3/4 m-auto max-w-5xl">
    <p class="text-xs">Stamp from photo by
      <a class="info-link " href="https://unsplash.com/@anniespratt?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Annie Spratt</a>
      on
      <a class="info-link" href="https://unsplash.com/photos/4Ujhq5_fJik?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
    </p>

  </InfoCaption>

  <div class="envelope m-auto bg-stone-200 w-3/4">
    <div class="stamp p-6 flex justify-end">
      <img width="70" class="rotate-[8deg]" :src="stampImage" />
    </div>
    <div class=" p-2 flex justify-end">
      <div class="address">
        <p>Miss Chloe Rose</p>
        <p>13 Cromwell Road</p>
        <p>London, SW3 5SD</p>
        <p>England</p>
      </div>
    </div>
  </div>

  <div class="answer mt-6 w-3/5 m-auto">
    <answer-input :isValid="isValid" :note="note" @providedAnswer="checkAnswer"></answer-input>
  </div>
</div>
</template>

<script setup>
import InfoCaption from "@/components/InfoCaption";
import AnswerInput from "@/components/AnswerInput";
import stampImage from '/public/img/Stamp.png';
import {ref, defineEmits} from "vue";
import {validateAnswer} from "@/composables/validateAnswer";
import {stamp} from "@/composables/answers";

let note = ref("Type your answer here:");
let previousAnswer = ref('');
const emit = defineEmits(['correctAnswer'])
let isValid = ref(null);

function checkAnswer(answer) {
  let validated = validateAnswer(answer, stamp, previousAnswer.value, isValid.value, note.value);

  previousAnswer.value = validated.previousAnswer;
  isValid.value = validated.isValid;
  note.value = validated.note;

  if(validated.isValid) {
    emit('correctAnswer', 'Faraon');
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Herr+Von+Muellerhoff&display=swap');

.envelope {
  min-height: 300px;
  max-width: 600px;
  min-width: 200px;
  color: #222630;
}

.caption {
  max-width: 600px;
}

.address {
  font-size: 1.6rem;
  text-align: left;
  width: 200px;
  font-family: 'Herr Von Muellerhoff', cursive;
}

.answer {
  min-width: 200px;
}
</style>