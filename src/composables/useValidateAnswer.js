import sha256 from "crypto-js/sha256";
import { ref } from 'vue';

export function useValidateAnswer(answer, acceptableAnswers) {
    let isValid = ref(false);

    function generateHash(value) {
        return sha256(value.toLowerCase().replace(/\s/g, "")).toString();
    }

    return () => {
        if(!answer.value) {
            isValid.value = null;
        }
        else {
            isValid.value = acceptableAnswers.find((e) => e === generateHash(answer.value)) !== undefined;
        }

        return isValid;
    };
}