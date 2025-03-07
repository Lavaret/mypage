import { defineStore } from 'pinia'
import { ref } from 'vue'

export const alertStore = defineStore('alert-store', () => {
    const all = ref([]);

    function addError(message) {
        addAlert(message, 'error')
    }

    function addSuccess(message) {
        addAlert(message, 'success')
    }

    function addAlert(message, type) {
        const id = Date.now()
        all.value.push({ message, id , type });
        setTimeout(() => removeAlert(id), 6390);
    }

    function removeAlert(id) {
        all.value = all.value.filter(error => error.id !== id);
    }

    return { all, addError, addSuccess, removeAlert };
});