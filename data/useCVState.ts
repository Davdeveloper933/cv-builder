import { reactive, toRefs } from 'vue'
import { useStorage } from '@vueuse/core'
import type { EditorFields } from '~/types/editor'
import { emptySectionFields } from '~/utils/constants'

const state = reactive({
  isWatching: false,
  historyId: 0,
  activeId: 1,
  editorInstance: null,
  cvref: null,
  selectedLayout: 'oneColumn',
  emptyFields: { ...emptySectionFields } as EditorFields,
})

const persistentState = useStorage('storageData', {
  history: [] as any[],
  future: [] as any[],
  current: {} as any,
  historyClone: [] as any[],
  templateIndex: 0 as number,
})
export function useCVState() {
  const setActiveId = (id: number) => {
    state.activeId = id
  }

  const getActiveId = () => {
    return state.activeId
  }

  return {
    ...toRefs(state),
    ...toRefs(persistentState.value),
    setActiveId,
    getActiveId,
  }
}
