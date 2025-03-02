import { defineStore } from 'pinia'

export const userStore = defineStore('user-store', {
    state: () => ({
        data: null,
        loggedIn: false,
        access_token: null,
        expires_in: null,
        expires_at: null,
    }),
})