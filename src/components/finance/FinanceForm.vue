<template>
  <section>
    <div class="mx-auto max-w-screen-xl">
      <div class="grid grid-cols-1 gap-x-16 gap-y-8">
        <div class="p-3 sm:p-8">
          <Vueform v-model="formData" @save="handleSave">
            <TextElement
                input-type="number"
                name="amount"
                data-test="input-amount"
                id="amount"
                v-model="formData.amount"
                :add-class="{
                  input: 'rounded-lg h-12 border-gray-200 bg-gray-700 p-3 text-sm'
                }"
            />
            <TextElement
                input-type="datetime-local"
                name="created_at"
                data-test="input-date"
                id="created_at"
                v-model="formData.created_at"
                :add-class="{
                  input: 'rounded-lg w-full h-12 border-gray-200 bg-gray-700 p-3 leading-4'
                }"
            />
            <TagsElement
                :create="true"
                v-model="formData.tags"
                name="tags"
                data-test="input-tags"
                id="tags"
                :items="[
                  { value: 'vuejs', label: 'Vue.js' },
                  { value: 'react', label: 'React' },
                  { value: 'angularjs', label: 'AngularJS' },
                ]"
            />
          </Vueform>
          <br />
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

              <div class="relative mt-1.5">
                <input
                    type="text"
                    list="tagList"
                    id="tags"
                    v-model="formData.tag"
                    data-test="input-tag"
                    class="w-full rounded-lg border-gray-300 h-12 bg-gray-700 ps-3 pe-10 text-gray-200 sm:text-sm [&::-webkit-calendar-picker-indicator]:opacity-0"
                    placeholder="Select a tag"
                />

                <span class="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-5 text-gray-500"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="tagList" id="tagList">
                <option value="1">Groceries</option>
                <option value="2">Media</option>
                <option value="3">Savings</option>
              </datalist>
            </div>

            <div>
              <label class="sr-only" for="message">Description</label>

              <textarea
                  class="w-full rounded-lg border-gray-200 bg-gray-700 p-3 text-sm"
                  placeholder="Description"
                  rows="8"
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
import { onMounted, ref } from 'vue'

const props = defineProps({
  savedData: {
    type: Object,
    default: () => {}
  }
})

// const builder$ = ref(null)

const formData = ref({
  amount: 100,
  created_at: new Date(),
  description: '',
  tag: ''
})

const handleSave = (builderObject, history) => {
  console.log(builderObject, history)
}

defineExpose({ formData });

onMounted(() => {
  if (props.savedData?.id) {
    Object.assign(formData.value, props.savedData)
  }

  //
  // console.log(builder$.value.builder) // builderObject
  // console.log(builder$.value.History.history) // hi
})

</script>

<style scoped>
.form-gap-y-gutter {
  gap: 2rem;
}
</style>