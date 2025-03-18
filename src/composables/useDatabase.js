import { ref } from 'vue'
import { client } from '@/db/supabaseClient'

export function useDatabase() {
    const loading = ref(false)

    const supabaseCall = async (callback) => {
        loading.value = true
        const { data, error } = await callback()

        if (error) {
            console.error('Error:', error.message);
            throw new Error(error.message);
        }

        loading.value = false
        return data;
    }

    const login = async (email, password) => (
        supabaseCall(() => (
            client.auth.signInWithPassword({
                email: email,
                password: password
            })
        ))
    )

    const getTransactions = (userId) => (
        supabaseCall(() => (
            client
                .from('Transactions')
                .select(`
                    *,
                    TransactionTag (
                        Tags (
                            id,
                            name,
                            color
                        )
                    )
                  `)
                .eq('user_id', userId)
        ))
    )

    const getTags = () => (
        supabaseCall(() => (
            client
                .from('Tags')
                .select(`
                    id,
                    name,
                    color
                  `)
        ))
    )

    const addTransaction = (payload) => (
        supabaseCall(() => (
            client
                .from('Transactions')
                .insert([
                    payload
                ])
                .select()
        ))
    )

    const deleteTransaction = (id) => (
        supabaseCall(() => (
            client
                .from('Transactions')
                .delete()
                .eq('id', id)
        ))
    )

    const updateTransaction = (id, amount, description, created_at) => (
        supabaseCall(() => (
            client
                .from('Transactions')
                .update({
                    amount,
                    description,
                    created_at
                })
                .eq('id', id)
                .select()
        ))
    )

    const assignTagToTransaction = (transaction_id, tag_id) => (
        supabaseCall(() => (
            client
                .from('TransactionTag')
                .insert([
                    { transaction_id, tag_id },
                ])
                .select()
        ))
    )

    const assignManyTagsToTransaction = (payload) => (
        supabaseCall(() => (
            client
                .from('TransactionTag')
                .insert(payload)
                .select()
        ))
    )

    const removeTagFromTransaction = (transactionId, tagId) => {
        supabaseCall(() => (
            client
                .from('TransactionTag')
                .delete()
                .eq('transaction_id', transactionId)
                .eq('tag_id', tagId)
        ))
    }

    return {
        login,
        getTransactions,
        getTags,
        addTransaction,
        deleteTransaction,
        assignTagToTransaction,
        assignManyTagsToTransaction,
        removeTagFromTransaction,
        updateTransaction,
        loading
    };
}