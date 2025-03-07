<template>

  <div class="mx-auto px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto">
      <div class="flex flex-nowrap gap-2 justify-center items-center">
        <h1 class="text-center text-2xl font-bold text-green-600 sm:text-3xl">
          Welcome to Finance
        </h1>
        <span class="animate-wiggle text-2xl">💸</span>
      </div>


      <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti
        inventore quaerat mollitia?
      </p>

      <form class="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg border border-green-900 sm:p-6 lg:p-8">
        <p class="text-center text-lg font-medium">Sign in to your account</p>

        <div>
          <label for="email" class="sr-only">Email</label>

          <div class="relative">
            <input
                type="email"
                v-model="username"
                :disabled="disabled"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs bg-gray-600"
                placeholder="Enter email"
            />

            <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label for="password" class="sr-only">Password</label>

          <div class="relative">
            <input
                type="password"
                v-model="password"
                :disabled="disabled"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs bg-gray-600"
                placeholder="Enter password"
            />

            <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <button @click.prevent="handleLogin"
            type="submit"
            class="block w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white"
        >
          Sign in
        </button>

        <button @click.prevent="alerts.addSuccess('test')">click</button>

      </form>

    </div>
  </div>
</template>

<script setup>
import { computed, ref} from 'vue'
import { useDatabase } from "@/composables/useDatabase";
import { userStore } from '@/store/userStore'
import { alertStore } from '@/store/alertStore'

const emit = defineEmits(['loggedIn'])

const { login } = useDatabase();
const user = userStore()
const alerts = alertStore()

const username = ref('');
const password = ref('');
const disabled = computed(() => user.failedLogins > 5)

const handleLogin = async () => {
  if (disabled.value) {
    alerts.addError('Too many failed logins!')
  }

  try {
    const data = await login(username.value, password.value)

    if (data) {
      user.$patch({
        data: data.user,
        loggedIn: true,
        access_token: data.session.access_token,
        expires_in: data.session.expires_in,
        expires_at: data.session.expires_at,
      })

      emit('loggedId')
    } else {
      user.failedLogins += 1
    }
  } catch (error) {
    alerts.addError(error.message)
  }
}

</script>

<style scoped>

</style>