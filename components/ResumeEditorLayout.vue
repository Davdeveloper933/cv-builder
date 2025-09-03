<template>
  <section class="" v-if="resumeData">
    <div class="relative">
      <EditorHeader
        :el="cvref"
        :template="template"
        :templates="TEMPLATES"
        :reset-resume="resetResume"
        :reset-settings="resetSettings"
      />
      <div class="lg:mx-auto lg:container">
        <slot />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { TEMPLATES } from '~/utils/constants'
import EditorHeader from '~/components/editor/EditorHeader.vue'
import type { ResumeData } from '~/types'

const props = defineProps<{
  useCVTemplate: Function
  template: ResumeData
  resumeData: ResumeData
  el: HTMLElement | null
}>()

const { resetHistory } = useHistoryFunctions()

const { originalTemplate, resetResume, resetSettings } = props.useCVTemplate()
const route = useRoute()
</script>

<style>
#preview {
  ol,
  ul {
    @apply list-inside;
    p {
      @apply inline;
    }
  }
}
</style>
