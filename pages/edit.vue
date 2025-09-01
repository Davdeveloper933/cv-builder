<template>
  <ResumeEditorLayout
    :el="cvref"
    :use-c-v-template="useCVTemplate"
    :template="originalTemplate"
    :resume-data="templateResume"
  >
    <div class="flex md:pt-6 bg-white relative">
      <div class="md:w-1/3 w-full px-2" v-if="templateResume">
        <ResumeEditor
          :resume-data="templateResume"
          :template="originalTemplate"
          :reset="resetResume"
        />
      </div>
      <div class="hidden lg:block">
        <div class="border-gray-800">
          <div ref="cvref">
            <ClientOnly>
              <ResumeWrapper>
                <component
                  :is="TEMPLATES[selectedIndex].component"
                  :resumeDataForEditing="templateResume"
                  ref="templateRef"
                  class=""
                  id="preview"
                />
              </ResumeWrapper>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
    <!--    </template>-->
  </ResumeEditorLayout>
</template>

<script lang="ts" setup>
import { TEMPLATES } from '~/utils/constants'
import { cvref, useIndex } from '~/composables/states'
import { useCVTemplate } from '~/composables/useCVstate'
import ResumeEditorLayout from '~/components/ResumeEditorLayout.vue'

definePageMeta({
  layout: 'edit',
})
const selectedIndex = useIndex()
const { resetHistory, history, setCurrent } = useHistoryFunctions()

const { templateResume, resetSettings, resetResume, originalTemplate } =
  useCVTemplate()

watch(
  () => templateResume.value,
  (newValue) => {
    setCurrent(newValue)
  },
  { deep: true },
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
