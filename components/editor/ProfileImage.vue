<script setup lang="ts">
import type { ResumeData } from '~/types'

defineProps<{
  src?: string
  resumeData: ResumeData
  isCustomTemplate: boolean
}>()
const { onImageChange } = useEditor()
</script>

<template>
  <div>
    <div>
      <h3
        class="mb-2 text-sm md:text-base font-bold font-sans uppercase my-2 tracking-wider"
      >
        Profile Image
      </h3>
      <div
        class="flex items-left flex-col-reverse bg-white rounded-xl shadow-sm"
      >
        <div class="w-full flex-col mt-2">
          <label
            for="file-upload"
            class="block text-xs md:text-sm font-medium text-gray-700 mb-1"
          >
            Upload file
          </label>

          <div class="relative w-fit">
            <input
              @change="onImageChange($event, resumeData)"
              type="file"
              id="file-upload"
              class="peer absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
            />
            <div
              class="flex border border-gray-300 rounded-md overflow-hidden text-sm"
            >
              <div
                class="bg-gray-900 text-xs md:text-sm text-white px-4 py-2 whitespace-nowrap"
              >
                Choose File
              </div>
              <div
                class="px-4 py-2 text-xs md:text-sm text-gray-500 peer-focus:text-gray-900"
              >
                No file chosen
              </div>
            </div>
          </div>
        </div>

        <div v-if="src !== ''">
          <img
            :src="src"
            alt="Profile preview"
            class="object-cover max-w-24 md:max-w-40 rounded-lg shadow-sm"
          />
        </div>
      </div>
    </div>
    <button
      class="mt-2"
      v-if="isCustomTemplate"
      @click="resumeData.profileImage = ''"
    >
      Clear profile image
    </button>
  </div>
</template>

<style scoped></style>
