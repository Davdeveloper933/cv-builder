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
          <div
            ref="cvref"
            class="md:origin-top lg:scale-[.7] xl:scale-[1] md:scale-[.5]"
          >
            <ResumeWrapper>
              <component
                :is="TEMPLATES[selectedIndex].component"
                :resumeDataForEditing="templateResume"
                class=""
                id="preview"
              />
            </ResumeWrapper>
          </div>
        </div>
      </div>
      <!--      <PreviewCanvas :cvref="cvref" :resume-data="templateResume" />-->
    </div>
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
  async (newValue) => {
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
