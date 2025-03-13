import en from '@vueform/vueform/locales/en'
import tailwind from '@vueform/vueform/dist/vueform'
import { defineConfig } from '@vueform/vueform'

import '@vueform/vueform/dist/vueform.css';


export default defineConfig({
    theme: tailwind,
    locales: { en },
    locale: 'en',
    classHelpers: true,
})