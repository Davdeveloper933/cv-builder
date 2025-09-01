import { ref } from 'vue'
import type { ResumeData } from '~/types'
import type {
  CustomSections,
  EditorFields,
  LeftColumnSections,
  ThemeColor,
} from '~/types/editor'
import { emptySectionFields } from '~/composables/states'

export default function useEditor() {
  const isEditing = ref(false)
  const isProfileImage = ref(false)
  const { push, current } = useHistoryFunctions()

  const listInputModels = ref({
    inputText: '',
  })

  const toggleEdit = () => {
    isEditing.value = !isEditing.value
  }

  const onImageChange = (event: Event, resumeData: ResumeData) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = reader.result as string
        resumeData.profileImage = dataUrl
      }
      reader.readAsDataURL(file)
      push(resumeData)
    }
  }

  const removeCustomSectionItem = (
    index: number,
    currentSection: CustomSections | LeftColumnSections,
  ) => {
    currentSection.splice(index, 1)
    push(current.value)
  }

  const removeResumeSection = (
    currentSection: keyof ResumeData,
    resumeData: ResumeData,
  ) => {
    delete resumeData[currentSection]
  }

  const removeSectionItem = (currentSection: any[], index: number) => {
    currentSection.splice(index, 1)
    push(current.value)
  }

  const addNewAnySection = (
    sectionArray: Array<object>,
    field: string,
    emptySectionFields: EditorFields,
  ) => {
    const length = sectionArray.length
    const emptySection = emptySectionFields[field]
    emptySection.id = length + 1
    sectionArray.push({ ...emptySection })
    push(current.value)
  }

  const addNewSectionListItem = (
    sectionArray: string | string[],
    field: string | undefined,
  ) => {
    if (typeof sectionArray === 'string' || field === undefined || field === '')
      return
    sectionArray.push(field)
    listInputModels.value.inputText = ''
    push(current.value)
  }

  const changeColor = (color: ThemeColor, resumeData: ResumeData): void => {
    resumeData.themeColor = color.color
    document.documentElement.style.setProperty('--primary', color.color)
    document.documentElement.style.setProperty(
      '--primary-lighter',
      color.lighter,
    )
  }

  const getCurrentColor = (colorValue: string) => {
    return COLORS.find((color) => color.color === colorValue) || COLORS[0]
  }

  return {
    getCurrentColor,
    changeColor,
    toggleEdit,
    onImageChange,
    removeCustomSectionItem,
    removeResumeSection,
    removeSectionItem,
    addNewAnySection,
    addNewSectionListItem,
    emptySectionFields,
    listInputModels,
    isEditing,
    isProfileImage,
  }
}
