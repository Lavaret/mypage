import sha256 from "crypto-js/sha256";
import { computed } from "vue";

export function useValidateAnswer(answer, acceptableAnswers) {
    const isValid = computed(() => {
        if (!answer.value) return null;
        return acceptableAnswers.includes(sha256(answer.value.toLowerCase().replace(/\s/g, "")).toString());
    });

    return { isValid };
}