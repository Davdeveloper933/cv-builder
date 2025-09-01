<template>
  <div class="pb-9">
    <div class="container mx-auto max-w-4xl text-center">
      <h1 class="text-3xl md:text-4xl font-bold mb-12">
        HOW WOULD YOU LIKE TO BUILD YOUR RESUME?
      </h1>

      <div
        class="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-8 md:space-y-0"
      >
        <NuxtLink
          @click="selectCustomTemplate(!isCustomTemplate)"
          to="/edit-custom"
          class="relative w-full md:w-1/2 bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex flex-col items-center text-center">
            <svg
              class="w-20 h-20 text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <h2 class="text-xl font-semibold mb-2 capitalize">
              Build Resume from Scratch
            </h2>
            <p class="text-gray-500 text-sm">
              We will guide you through each section of the resume!
            </p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/templates"
          class="relative w-full md:w-1/2 bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex flex-col items-center text-center">
            <svg
              class="w-20 h-20 text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              ></path>
            </svg>
            <h2 class="text-xl font-semibold mb-2 capitalize">
              Choose template
            </h2>
            <p class="text-gray-500 text-sm">
              We will reformat it to a new template, so you don't have to.
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCustomTemplatePicker } from '~/composables/useCVstate'

const route = useRoute()
const isCustomTemplate = computed(() => route.fullPath === '/edit-custom')
const { selectCustomTemplate } = useCustomTemplatePicker()
</script>

<style></style>
