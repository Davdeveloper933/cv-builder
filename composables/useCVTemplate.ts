import type { ResumeData, Template } from '~/types'
import { useStorage } from '@vueuse/core'
import { transformResumeDataContent } from '~/utils/helpers'
import useHistory from '~/composables/useHistory'
import { customTemplate } from '~/data/cv-settings'
import { COLORS, TEMPLATES } from '~/utils/constants'
import cloneDeep from 'lodash-es/cloneDeep'
import { useCVState } from '~/data/useCVState'

export function useCVTemplate() {
  const { resetHistory, push, setCurrent } = useHistory()
  const { history } = useCVState()
  const { changeColor } = useThemeColor()
  const { templateIndex } = useCVState()

  const originalTemplate = transformResumeDataContent(
    cloneDeep(TEMPLATES[templateIndex.value].data),
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
    transformResumeDataContent(TEMPLATES[templateIndex.value].data),
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
    if (!history.value.length) {
      push(resumeData)
    }
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
  const { templateIndex } = useCVState()
  const { resetResume } = useCVTemplate()
  const { resetHistory } = useHistory()

  const selectTemplate = async (index: number, isCustomTemplate: boolean) => {
    templateIndex.value = index
    resetHistory()
    resetResume(templates[templateIndex.value].data, isCustomTemplate)
    await navigateTo('/edit')
  }

  return { selectTemplate, templateIndex }
}

export function useCustomTemplatePicker() {
  const { resetResume } = useCVTemplate()
  const { resetHistory } = useHistory()
  const selectCustomTemplate = (isCustomTemplate: boolean) => {
    resetHistory()
    resetResume(customTemplate, isCustomTemplate)
  }

  return { selectCustomTemplate }
}
