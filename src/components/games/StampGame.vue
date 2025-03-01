<template>
  <game-component>
    <template #question>
      A secret message is hidden on this envelope. Can you read it?
    </template>
    <template #game-content>

      <InfoCaption class="caption m-auto max-w-5xl">
        <p class="text-xs">Stamp from photo by
          <a class="info-link " href="https://unsplash.com/@anniespratt?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Annie Spratt</a>
          on
          <a class="info-link" href="https://unsplash.com/photos/4Ujhq5_fJik?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
        </p>
      </InfoCaption>

      <div class="envelope m-auto bg-stone-200">
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

    </template>

    <template #answers>
      <answer-input :answers="stamp" @correctAnswer="$emit('nextLevel', 'Faraon')"></answer-input>
    </template>
  </game-component>
</template>

<script setup>
import InfoCaption from "@/components/InfoCaption";
import AnswerInput from "@/components/AnswerInput";
import stampImage from '/public/img/Stamp.png';
import { stamp } from "@/composables/answers";
import GameComponent from "@/components/games/GameComponent";

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

</style>