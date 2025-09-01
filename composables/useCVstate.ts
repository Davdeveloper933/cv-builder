import type { ResumeData, Template } from '~/types'
import { useStorage } from '@vueuse/core'
import { transformResumeDataContent } from '~/utils/helpers'
import useHistoryFunctions from '~/composables/useHistoryFunctions'
import { customTemplate } from '~/data/cv-settings'
import { COLORS, TEMPLATES } from '~/utils/constants'
import cloneDeep from 'lodash-es/cloneDeep'

export function useCVTemplate() {
  const { history, resetHistory, push, setCurrent } = useHistoryFunctions()
  const { changeColor } = useEditor()
  const selectedIndex = useIndex() //

  const originalTemplate = transformResumeDataContent(
    cloneDeep(TEMPLATES[selectedIndex.value].data),
  )
  const defaultCustomTemplate = transformResumeDataContent(
    cloneDeep(customTemplate),
  )

  const customResume = useStorage(
    'customResume',
    transformResumeDataContent(customTemplate),
  )
  const templateResume = useStorage(
    'templateResume',
    transformResumeDataContent(TEMPLATES[selectedIndex.value].data),
  )

  const resetResume = (template: ResumeData, isCustomTemplate: boolean) => {
    const originalTemplate = transformResumeDataContent(cloneDeep(template))
    const defaultCustomTemplate = transformResumeDataContent(
      cloneDeep(customTemplate),
    )
    if (isCustomTemplate) {
      customResume.value = originalTemplate
    } else {
      templateResume.value = originalTemplate
    }
  }

  const resetSettings = (
    reset: Function,
    resumeData: ResumeData,
    isCustomTemplate: boolean,
  ) => {
    resetHistory()
    reset(resumeData, isCustomTemplate)
    changeColor(COLORS[0], resumeData)
    // if (!history.value.length) {
    //   push(resumeData)
    // }
    setCurrent(resumeData)
  }

  return {
    customResume,
    templateResume,
    originalTemplate,
    resetResume,
    defaultCustomTemplate,
    resetSettings,
  }
}

export function useTemplatePicker(templates: Template[]) {
  const selectedIndex = useIndex() //
  const { resetResume, resetSettings } = useCVTemplate()
  const { resetHistory } = useHistoryFunctions()

  const selectTemplate = async (index: number, isCustomTemplate: boolean) => {
    selectedIndex.value = index
    resetHistory()
    resetResume(templates[index].data, isCustomTemplate)
    await navigateTo('/edit')
  }

  return { selectTemplate, selectedIndex }
}

export function useCustomTemplatePicker() {
  const { resetResume } = useCVTemplate()
  const { resetHistory } = useHistoryFunctions()
  const selectCustomTemplate = (isCustomTemplate: boolean) => {
    resetHistory()
    resetResume(customTemplate, isCustomTemplate)
  }

  return { selectCustomTemplate }
}
