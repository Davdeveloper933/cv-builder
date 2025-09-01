<script setup lang="ts">
import OneColumnTemplate from '~/components/Templates/OneColumnTemplate.vue'
import TwoColumnTemplate from '~/components/Templates/TwoColumnTemplate.vue'
import { useCVTemplate } from '~/composables/useCVstate'

const { customResume, resetResume, defaultCustomTemplate, resetSettings } =
  useCVTemplate()
</script>

<template>
  <div>
    <OneColumnTemplate
      v-if="customResume?.layout === 'oneColumn'"
      ref="templateRef"
      :resume-data-for-editing="customResume"
      class=""
      id="preview"
    />
    <TwoColumnTemplate
      v-if="customResume?.layout === 'twoColumn'"
      ref="templateRef"
      :resume-data-for-editing="customResume"
      class=""
      id="preview"
    />
  </div>
</template>

<style scoped></style>
