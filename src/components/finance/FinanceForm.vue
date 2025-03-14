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
                  data-test="input-amount"
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
                  data-test="input-date"
                  id="date"
                  v-model="formData.created_at"
              />
            </div>

            <div>

              <multiselect
                  v-model="formData.tags"
                  id="tags"
                  data-test="input-tag"
                  :multiple="true"
                  :options="[
                      {
                        id: 1,
                        name: 'Groceries',
                      },
                      {
                        id: 2,
                        name: 'Media',
                      },
                      {
                        id: 3,
                        name: 'Savings'
                      }
                  ]"
                  placeholder="Select tags"
                  track-by="id"
                  label="name"
                  select-label="Add!"
                  selected-label=""
                  deselect-label="Remove"
              >
                <template #noResult>
                  No elements found
                </template>
              </multiselect>
            </div>

            <div>
              <label class="sr-only" for="message">Description</label>

              <textarea
                  class="w-full rounded-lg border-gray-200 bg-gray-700 p-3 text-sm"
                  placeholder="Description"
                  rows="3"
                  id="description"
                  data-test="input-description"
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
import {onMounted, ref} from 'vue'
import Multiselect from 'vue-multiselect'

const props = defineProps({
  savedData: {
    type: Object,
    default: () => {}
  }
})

const formData = ref({
  amount: 100,
  created_at: new Date(),
  description: '',
  tags: ''
})

defineExpose({ formData });

onMounted(() => {
  if (props.savedData?.id) {
    const { description, amount, created_at, TransactionTag } = props.savedData
    formData.value = {
      description,
      amount,
      created_at: new Date(created_at)?.toISOString().slice(0, 19),
      tags: TransactionTag.map((tag) => (tag.Tags))
    }
  }
})

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">

</style>