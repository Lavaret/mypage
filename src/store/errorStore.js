import { defineStore } from 'pinia'
import { ref } from 'vue'

export const errorStore = defineStore('error-store', () => {
    const errors = ref([]);

    function addError(message) {
        errors.value.push({ message, id: Date.now() });
        setTimeout(() => removeError(message), 5000);
    }

    function removeError(message) {
        errors.value = errors.value.filter(error => error.message !== message);
    }

    return { errors, addError, removeError };
});