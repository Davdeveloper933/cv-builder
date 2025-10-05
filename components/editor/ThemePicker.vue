<template>
  <div class="space-y-4 text-black-300">
    <h3 class="text-sm sm:text-base uppercase font-bold mb-2">
      Select theme color
    </h3>
    <div class="flex flex-wrap gap-4">
      <label
        v-for="(color, i) in COLORS"
        :key="i"
        class="cursor-pointer relative"
      >
        <input
          @change="changeColorWrapper(color, resumeData)"
          type="radio"
          class="sr-only"
          :value="color.color"
          v-model="resumeData.themeColor"
        />
        <div
          class="sm:w-10 sm:h-10 w-8 h-8 rounded-full border-4 transition-all duration-200"
          :style="{
            backgroundColor: color.color,
            borderColor:
              resumeData.themeColor === color.color
                ? color.color
                : 'transparent',
          }"
        >
          <div
            v-if="resumeData.themeColor === color.color"
            class="absolute inset-0 flex items-center justify-center text-white"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { COLORS } from '~/utils/constants'
import type { ResumeData } from '~/types'
import type { ThemeColor } from '~/types/editor'

const props = defineProps<{
  resumeData: ResumeData
}>()
const { changeColor } = useThemeColor()
const { push } = useHistory()

const changeColorWrapper = (color: ThemeColor, resumeData: ResumeData) => {
  changeColor(color, resumeData)
  push(props.resumeData)
}
</script>
