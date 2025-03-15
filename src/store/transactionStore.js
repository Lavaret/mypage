import { defineStore } from 'pinia'
import { useDatabase } from "@/composables/useDatabase";
import { userStore } from '@/store/userStore'
import { alertStore } from "@/store/alertStore"

const {
    getTransactions,
    assignManyTagsToTransaction,
    removeTagFromTransaction,
} = useDatabase()

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

        async loadTransactions() {
            const user = userStore()

            try {
                const data = await getTransactions(user.data.id)

                if (data.length) {
                    data.map((transaction) => {
                        transaction.tags = transaction.TransactionTag.map((tag) => (tag.Tags))
                        transaction.created_at = new Date(transaction.created_at)?.toISOString().slice(0, 19)
                        return transaction
                    })
                    this.data = data
                }
            } catch (e) {
                console.error(e)
            }
        },
        async addManyTags(transactionId, tags) {
            const payload = tags.map((tag) => ({ 'transaction_id': transactionId, 'tag_id': tag.id }))

            // console.log(payload)
            await this.addTag(payload)
        },
        async addTag(data) {
            const alerts = alertStore()

            try {
                const response = await assignManyTagsToTransaction(data)

                if (response) {
                    return response
                }
            } catch {
                alerts.addError('cannot add tags')
            }
        },
        async removeTag(transactionId, tags) {
            for (let i = 0; i < tags.length; i++) {
                await removeTagFromTransaction(transactionId, tags[i].id)
            }
        },
        async updateTags(transactionId, oldTags, newTags) {
            const setOfNewTags = new Set(newTags);
            const setOfOldTags = new Set(oldTags);

            const removedTags = oldTags.filter(num => !setOfNewTags.has(num))
            const addedTags = newTags.filter(num => !setOfOldTags.has(num))

            await this.addManyTags(transactionId, addedTags)
            await this.removeTag(transactionId, removedTags)
        }
    }
})