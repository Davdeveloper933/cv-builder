<template>
  <ResumeEditorLayout
    :el="cvref"
    :use-c-v-template="useCVTemplate"
    :template="originalTemplate"
    :resume-data="templateResume"
  >
    <div class="grid grid-cols-3 md:pt-6 bg-white relative">
      <div class="col-span-3 md:col-span-1 px-2" v-if="templateResume">
        <ResumeEditor
          :resume-data="templateResume"
          :template="originalTemplate"
          :reset="resetResume"
        />
      </div>
      <div class="hidden md:col-span-1 md:block">
        <div class="border-gray-800">
          <div class="md:origin-top lg:scale-[.7] xl:scale-[1] md:scale-[.5]">
            <div ref="cvref">
              <ResumeWrapper
                :height-class="'h-full'"
                :max-height-class="'max-h-full'"
              >
                <component
                  :is="TEMPLATES[templateIndex].component"
                  :resumeDataForEditing="templateResume"
                  class=""
                  id="preview"
                />
              </ResumeWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ResumeEditorLayout>
</template>

<script lang="ts" setup>
import { TEMPLATES } from '~/utils/constants'
import { useCVTemplate } from '~/composables/useCVTemplate'
import ResumeEditorLayout from '~/components/ResumeEditorLayout.vue'
import { useCVState } from '~/data/useCVState'

definePageMeta({
  layout: 'edit',
})
const { templateIndex } = useCVState()
const { setCurrent } = useHistory()
const { cvref } = useCVState()

const { templateResume, resetSettings, resetResume, originalTemplate } =
  useCVTemplate()

watch(
  () => templateResume.value,
  (newValue) => {
    setCurrent(newValue)
  },
  { deep: true, immediate: true },
)
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
