import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useDatabase } from "@/composables/useDatabase";

export const tagStore = defineStore('tag-store', () => {

    const { getTags } = useDatabase()
    const all = ref([]);

    async function loadTags() {
        try {
            const data = await getTags()

            if (data.length) {
                all.value = data
            }
        } catch (e) {
            console.error(e)
        }
    }

    return { all, loadTags };
})