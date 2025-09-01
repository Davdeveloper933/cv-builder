<script setup lang="ts">
import type { ResumeData } from '~/types'

const props = withDefaults(
  defineProps<{
    fieldLabel: string
    inputType?: string
    resumeData?: ResumeData
  }>(),
  {
    inputType: 'text',
  },
)

const { push, historyClone, current } = useHistoryFunctions()
const fieldModelValue = defineModel()
const onChange = () => {
  push(current.value)
}
</script>

<template>
  <div class="w-full relative">
    <label
      :for="fieldLabel"
      class="inline-block capitalize top-[-9px] left-5 absolute z-10 bg-white px-1 text-xs md:text-sm font-medium text-gray-700 mb-1"
      >{{ fieldLabel }}</label
    >
    <input
      @input="onChange"
      :type="inputType"
      :id="fieldLabel"
      name="name"
      v-model="fieldModelValue"
      :placeholder="fieldLabel"
      class="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus-visible:border-purple-600 focus:border-purple-600 focus:ring-purple-600 text-xs md:text-sm"
    />
  </div>
</template>

<style scoped></style>
