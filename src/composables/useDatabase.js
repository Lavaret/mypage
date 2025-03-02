import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'

export function useDatabase() {
    const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY;

    console.log('**getting supabase client')
    const client = createClient(supabaseUrl, supabaseAnonKey);
    const error = ref('')
    const loading = ref(false)

    const login = async (email, password) => {

        try {
            loading.value = true
            const { data, error } = await client.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                console.error('Login error:', error.message);
                throw new Error(`Login error: ${error.message}`);
            }

            return data;
        } catch (err) {
            error.value = err.message;
            return null;
        } finally {
            loading.value = false;
        }
    }

    const getTransactions = async (userId) => {
        try {
            loading.value = true

            const { data, error } = await client
                .from('Transactions')
                .select('*')
                .eq('user_id', userId)

            if (error) {
                console.error('Database error:', error.message);
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (err) {
            error.value = err.message;
            return null;
        } finally {
            loading.value = false;
        }
    }

    return { login, getTransactions, error, loading };
}