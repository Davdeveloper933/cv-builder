// useHistoryState.ts (новый файл, как store)
import { ref } from 'vue'
import type { ResumeData } from '~/types'
import { useStorage } from '@vueuse/core'

export const future = useStorage<any[]>('future', [])
export const current = useStorage<ResumeData | {}>('current', {})
export const isWatching = ref<boolean>(false)
export const historyId = ref(1)
export const historyClone = useStorage<any[]>('historyClone', [])
