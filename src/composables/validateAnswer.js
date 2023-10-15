import sha256 from "crypto-js/sha256";
import {getRandomGood, getRandomWrong} from "@/composables/reactions";

export function validateAnswer(newAnswer, answers, previousAnswer, isValid, note) {

    let validated = {
        answer: newAnswer,
        previousAnswer: previousAnswer,
        isValid: isValid,
        note: note
    }

    if(newAnswer === previousAnswer && isValid === false) {
        return validated;
    }

    if(newAnswer === '') {
        validated.note = 'Type your answer here:';
        validated.isValid = null;
        return validated;
    }

    let hash = sha256(newAnswer.toLowerCase().replace(/\s/g, "")).toString();

    if(answers.find((e) => e === hash)) {
        validated.note = getRandomGood();
        validated.isValid = true;

    } else {
        validated.note = getRandomWrong();
        validated.isValid = false;
    }

    validated.previousAnswer = newAnswer;

    return validated;
}