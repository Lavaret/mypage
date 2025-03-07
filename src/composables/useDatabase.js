import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'

export function useDatabase() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    console.log('**getting supabase client')
    const client = createClient(supabaseUrl, supabaseAnonKey);
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