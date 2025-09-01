<template>
  <ResumeEditorLayout
    :el="cvref"
    :use-c-v-template="useCVTemplate"
    :template="defaultCustomTemplate"
    :resume-data="customResume"
  >
    <div class="flex pt-6 bg-white relative">
      <div class="md:w-1/3 w-full px-2" v-if="customResume">
        <ResumeEditor
          :resume-data="customResume"
          :template="defaultCustomTemplate"
          :reset="resetResume"
        />
      </div>
      <div class="col-span-2 hidden lg:block">
        <div class="border-gray-800">
          <div ref="cvref" v-if="customResume">
            <ClientOnly>
              <ResumeWrapper>
                <CustomTemplate ref="templateRef" class="" id="preview" />
              </ResumeWrapper>
            </ClientOnly>

            <!--            <ClientOnly>-->
            <!--              <ResumeWrapper>-->
            <!--                <OneColumnTemplate-->
            <!--                  v-if="customResume?.layout === 'oneColumn'"-->
            <!--                  ref="templateRef"-->
            <!--                  :resume-data-for-editing="customResume"-->
            <!--                  class=""-->
            <!--                  id="preview"-->
            <!--                />-->
            <!--                <TwoColumnTemplate-->
            <!--                  v-if="customResume?.layout === 'twoColumn'"-->
            <!--                  ref="templateRef"-->
            <!--                  :resume-data-for-editing="customResume"-->
            <!--                  class=""-->
            <!--                  id="preview"-->
            <!--                />-->
            <!--              </ResumeWrapper>-->
            <!--            </ClientOnly>-->
          </div>
        </div>
      </div>
    </div>
    <!--    </template>-->
  </ResumeEditorLayout>
</template>

<script lang="ts" setup>
import { cvref } from '~/composables/states'
import { useCVTemplate } from '~/composables/useCVstate'
import ResumeEditorLayout from '~/components/ResumeEditorLayout.vue'
import CustomTemplate from '~/components/Templates/CustomTemplate.vue'

definePageMeta({
  layout: 'edit',
})
const { setCurrent, history } = useHistoryFunctions()
const { customResume, resetResume, defaultCustomTemplate, resetSettings } =
  useCVTemplate()
const { changeColor, getCurrentColor } = useEditor()

onMounted(() => {
  const currentColor = getCurrentColor(customResume.value.themeColor)
  changeColor(currentColor, customResume.value)
  setCurrent(customResume.value)
})

watch(
  () => customResume.value,
  (newValue) => {
    // myResumes.value.customResume = {
    //   resume: newValue,
    //   history: history.value,
    // }
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
