import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
import type { EditorFields } from '~/types/editor'
// import type { MyResumes } from '~/types'

// export const myResumes = ref<MyResumes>({
//   templateResume: { resume: null, history: [] },
//   customResume: { resume: null, history: [] },
// })
// export const future = ref<any[]>([])
// export const current = ref<ResumeData | null>(null)
// export const isWatching = ref<boolean>(false)
// export const historyId = ref(1)
// export const historyClone = ref<any[]>([])
export const editorInstance = ref(null)
export const cvref = ref<HTMLElement | null>(null)
export const useIndex = () => useStorage('templateIndex', 0)
export const useHistory = () => useStorage<Array<any>>('history', [])
export const selectedLayout = ref('oneColumn')
export const emptySectionFields = ref<EditorFields>({
  education: {
    id: 0,
    title: 'Your title',
    dates: {
      start: new Date('feb 2014'),
      end: new Date('jan 2018'),
      current: false,
    },
    location: 'Location',
  },
  experience: {
    id: 0,
    title: 'Your title',
    dates: {
      start: new Date('feb 2014'),
      end: new Date('jan 2018'),
      current: false,
    },
    company: 'Company',
    country: 'Country',
    content: 'Summary',
  },
  customSection: {
    id: 0,
    title: 'Custom Section',
    description: '',
    dates: {
      start: new Date('feb 2014'),
      end: new Date('jan 2018'),
      current: false,
    },
    content: 'Summary',
  },
  leftColumnSection: {
    id: 0,
    title: 'Left Column Section',
    description: '',
    contentHTML: '',
  },
})
