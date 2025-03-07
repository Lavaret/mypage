<template>
  <section>
    <div class="mx-auto max-w-screen-xl">
      <div class="grid grid-cols-1 gap-x-16 gap-y-8">
        <div class="p-3 sm:p-8">
          <form class="space-y-4">
            <div>
              <label class="sr-only" for="Amount">Amount</label>
              <input
                  class="w-full rounded-lg h-12 border-gray-200 bg-gray-700 p-3 text-sm"
                  placeholder="Amount"
                  type="number"
                  id="amount"
                  v-model="formData.amount"
              />
            </div>

            <div>
              <label class="sr-only" for="date">Date</label>
              <input
                  class="w-full rounded-lg w-full h-12 border-gray-200 bg-gray-700 p-3 text-sm"
                  type="datetime-local"
                  id="date"
                  v-model="formData.created_at"
              />
            </div>

            <div>
              <label class="sr-only" for="message">Description</label>

              <textarea
                  class="w-full rounded-lg border-gray-200 bg-gray-700 p-3 text-sm"
                  placeholder="Description"
                  rows="8"
                  id="description"
                  v-model="formData.description"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  amount: 100,
  created_at: new Date(),
  description: ''
})

defineExpose({ formData });

</script>

<style scoped>

</style>