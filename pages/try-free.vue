<template>
  <div class="pb-9 px-3">
    <div class="container mx-auto max-w-4xl text-center">
      <h1 class="text-xl md:text-3xl xl:text-4xl font-bold mb-12">
        HOW WOULD YOU LIKE TO BUILD YOUR RESUME?
      </h1>

      <div class="flex gap-6 flex-col md:flex-row justify-center items-start">
        <NuxtLink
          @click="selectCustomTemplate(!isCustomTemplate)"
          to="/edit-custom"
          class="relative w-full md:w-auto bg-white rounded-lg shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex space-y-2 flex-col items-center text-center">
            <!--            иконка-->
            <div>
              <img class="max-w-20" :src="cvPngSrc" alt="" />
            </div>
            <h2 class="text-xl font-semibold capitalize">
              Build Resume from Scratch
            </h2>
            <p class="text-gray-500 text-sm">
              We will guide you through each section of the resume!
            </p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/templates"
          class="relative w-full md:w-auto bg-white rounded-lg shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex space-y-2 flex-col items-center text-center">
            <!--            иконка-->
            <div>
              <img class="max-w-20" :src="cvTemplatePngSrc" alt="" />
            </div>
            <h2 class="text-xl font-semibold capitalize">Choose template</h2>
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
import { useCustomTemplatePicker } from '~/composables/useCVTemplate'

import cvTemplatePngSrc from '~/public/images/cv-template.png'
import cvPngSrc from '~/public/images/cv.png'

const route = useRoute()
const isCustomTemplate = computed(() => route.fullPath === '/edit-custom')
const { selectCustomTemplate } = useCustomTemplatePicker()
</script>

<style></style>
