<template>
  <div class="space-y-4 text-black-300">
    <h3 class="text-sm sm:text-base uppercase font-bold mb-2">Select layout</h3>
    <div class="flex flex-wrap gap-4">
      <label
        :class="{
          'bg-blue-600 hover:bg-blue-700 text-white ':
            resumeData.layout === layout,
          'bg-white text-black-300 hover:bg-gray-200':
            resumeData.layout !== layout,
        }"
        v-for="(layout, i) in LAYOUTS"
        :key="i"
        class="cursor-pointer flex font-bold justify-center items-center md:gap-3 gap-1 px-3 md:px-6 md:py-2 py-1 rounded-lg shadow transition"
      >
        <input
          class="sr-only"
          v-model="resumeData.layout"
          type="radio"
          :value="layout"
          @change="onChangeLayout"
        />
        <span class="capitalize text-xs sm:text-sm">{{ layout }}</span>
      </label>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LAYOUTS } from '~/utils/constants.js'
import type { ResumeData } from '~/types'

const props = defineProps<{
  resumeData: ResumeData
}>()

const { push } = useHistory()

const onChangeLayout = (): void => {
  push(props.resumeData)
}
</script>
<style scoped></style>
