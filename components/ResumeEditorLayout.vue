<template>
  <section class="mx-auto md:container md:px-4" v-if="resumeData">
    <div class="relative">
      <EditorHeader
        :el="cvref"
        :template="template"
        :templates="TEMPLATES"
        :reset-resume="resetResume"
        :reset-settings="resetSettings"
      />

      <slot />
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
