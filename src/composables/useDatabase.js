import { ref } from 'vue'
import { client } from '@/db/supabaseClient'

export function useDatabase() {
    const loading = ref(false)

    const supabaseCall = async (callback) => {
        loading.value = true
        const { data, error } = await callback()

        if (error) {
            console.error('Error:', error.message);
            throw new Error(`Error: ${error.message}`);
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
                .select('*')
                .eq('user_id', userId)
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

    return {
        login,
        getTransactions,
        addTransaction,
        deleteTransaction,
        loading
    };
}