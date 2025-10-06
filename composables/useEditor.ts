import { ref } from 'vue'
import type { ResumeData } from '~/types'
import type {
  CustomSections,
  EditorFields,
  LeftColumnSections,
} from '~/types/editor'
import { compressImage } from '~/utils/helpers'
import { useCVState } from '~/data/useCVState'

export default function useEditor() {
  const { push } = useHistory()
  const { current } = useCVState()
  const isEditing = ref(false)
  const isProfileImage = ref(false)

  const listInputModels = ref({
    inputText: '',
  })

  const toggleEdit = () => {
    isEditing.value = !isEditing.value
  }

  const onImageChange = (event: Event, resumeData: ResumeData) => {
    const target = event.target as HTMLInputElement | null
    const file = target?.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const dataUrl = reader.result as string
        const compressed = await compressImage(dataUrl, 0.7)
        resumeData.profileImage = compressed
        push(resumeData)
      } catch (error) {
        console.error('Image compression failed', error)
      }
    }
    reader.readAsDataURL(file)
    if (target) target.value = ''
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

  const removeSectionItem = (
    currentSection: Array<string | object>,
    index: number,
  ) => {
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

  return {
    toggleEdit,
    onImageChange,
    removeCustomSectionItem,
    removeResumeSection,
    removeSectionItem,
    addNewAnySection,
    addNewSectionListItem,
    listInputModels,
    isEditing,
    isProfileImage,
  }
}
