import { defineStore } from 'pinia'

export const transactionStore = defineStore('transaction-store', {
    state: () => ({
        data: [],
    }),

    getters: {
        current: (state) => {
            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();

            return state.data.filter(t => {
                const tDate = new Date(t.created_at);
                return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
            });
        },
    },

    actions: {
        filterByDate(month, year) {
            return this.data.filter((t) => {
                const tDate = new Date(t.created_at);
                return tDate.getMonth() === month && tDate.getFullYear() === year;
            })
        },
    }
})