import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
    ],
    server: {
        port: 8080,
        open: true,
        fs: {
            cachedChecks: false
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: ['.js', '.ts', '.vue'],
    },
})