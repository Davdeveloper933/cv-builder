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
import { useCVState } from '~/data/useCVState'

interface Props {
  useCVTemplate: () => {
    originalTemplate: ResumeData
    resetResume: (data: ResumeData, isCustom?: boolean) => void
    resetSettings: () => void
  }
  template: ResumeData
  resumeData: ResumeData
  el: HTMLElement | null
}

const props = defineProps<Props>()

const { resetResume, resetSettings } = props.useCVTemplate()
const { cvref } = useCVState()
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
