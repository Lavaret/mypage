import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'

export function useDatabase() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    console.log('**getting supabase client')
    const client = createClient(supabaseUrl, supabaseAnonKey);
    const error = ref('test')
    const loading = ref(false)

    const supabaseCall = async (callback) => {
        try {
            loading.value = true
            const { data, error } = await callback()

            if (error) {
                console.error('Error:', error.message);
                throw new Error(`Error: ${error.message}`);
            }

            return data;
        } catch (err) {
            error.value = err.message;
            return null;
        } finally {
            loading.value = false;
        }
    }

    const login = (email, password) => (
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

    return {
        login,
        getTransactions,
        addTransaction,
        error,
        loading
    };
}