<template>
  <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
    <h3 class="text-sm sm:text-base font-bold mb-2 uppercase">
      Display Sections
    </h3>
    <div class="flex flex-wrap gap-3">
      <div
        v-for="item in CHECKBOX_ITEMS"
        :key="item.value"
        class="flex items-center space-x-3"
      >
        <input
          type="checkbox"
          :id="item.value"
          v-model="selectedSections"
          :value="item.value"
          @change="onChange(item.value)"
          class="form-checkbox h-2.5 w-2.5 md:h-5 md:w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
        />
        <label
          :for="item.value"
          class="text-gray-800 text-sm md:text-base cursor-pointer select-none"
        >
          {{ item.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CHECKBOX_ITEMS } from '~/utils/constants'
import type { ResumeData } from '~/types'

const props = defineProps<{
  resumeData: ResumeData
}>()

const { push } = useHistory()

const selectedSections: ComputedRef<string[]> = computed(() => {
  return Object.keys(props.resumeData).filter(
    (key) => props.resumeData[key].show,
  )
})

const onChange = (item: string) => {
  props.resumeData[item].show = !props.resumeData[item].show
  push(props.resumeData)
}
</script>
