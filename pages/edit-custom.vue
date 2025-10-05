<template>
  <ResumeEditorLayout
    :el="cvref"
    :use-c-v-template="useCVTemplate"
    :template="defaultCustomTemplate"
    :resume-data="customResume"
  >
    <div class="grid grid-cols-3 md:pt-6 bg-white relative">
      <div class="col-span-3 md:col-span-1 px-2" v-if="customResume">
        <ResumeEditor
          :resume-data="customResume"
          :template="defaultCustomTemplate"
          :reset="resetResume"
        />
      </div>
      <div class="hidden md:col-span-1 md:block">
        <div class="border-gray-800">
          <div
            class="md:origin-top lg:scale-[.7] xl:scale-[1] md:scale-[.5]"
            v-if="customResume"
          >
            <div ref="cvref">
              <ResumeWrapper
                :height-class="'h-full'"
                :max-height-class="'max-h-full'"
              >
                <CustomTemplate ref="templateRef" class="" id="preview" />
              </ResumeWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ResumeEditorLayout>
</template>

<script lang="ts" setup>
import { useCVTemplate } from '~/composables/useCVTemplate'
import ResumeEditorLayout from '~/components/ResumeEditorLayout.vue'
import CustomTemplate from '~/components/Templates/CustomTemplate.vue'
import { useCVState } from '~/data/useCVState'

definePageMeta({
  layout: 'edit',
})
const { setCurrent } = useHistory()
const { cvref } = useCVState()
const { customResume, resetResume, defaultCustomTemplate } = useCVTemplate()
const { changeColor, getCurrentColor } = useThemeColor()

onMounted(() => {
  const currentColor = getCurrentColor(customResume.value.themeColor)
  changeColor(currentColor, customResume.value)
  setCurrent(customResume.value)
})

watch(
  () => customResume.value,
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
