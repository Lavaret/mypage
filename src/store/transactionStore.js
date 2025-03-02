import { defineStore } from 'pinia'

export const transactionStore = defineStore('transaction-store', {
    state: () => ({
        data: [],
    }),
})