import type { ResumeData } from '~/types'
import { useHistory } from '~/composables/states'
import cloneDeep from 'lodash-es/cloneDeep'
import { debounce } from 'lodash-es'
import {
  current,
  future,
  historyClone,
  historyId,
  isWatching,
} from './useHistoryState'
import type { RemovableRef } from '@vueuse/core'

const { changeColor, getCurrentColor } = useEditor()

export default function useHistoryFunctions() {
  const MAX_HISTORY_LENGTH = 30
  const history = useHistory()
  const setCurrent = (data: ResumeData) => {
    current.value = data
  }

  const truncateHistory = (history: RemovableRef<any[]>, maxLength: number) => {
    while (history.value.length > maxLength) {
      history.value.shift()
    }
  }

  const push = debounce((data: ResumeData) => {
    if (!data) return
    // if (data.profileImage === '') return
    truncateHistory(history, MAX_HISTORY_LENGTH)
    const dataClone = cloneDeep(data)
    const item = {
      id: historyId.value++,
      resumeData: dataClone,
      time: new Date().toLocaleString(),
    }
    history.value.push(item)
    historyClone.value = cloneDeep(history.value)
  }, 100)

  const resetHistory = () => {
    history.value = []
    future.value = []
    historyClone.value = []
    historyId.value = 1
  }

  function undo(resetResume: Function, isCustomTemplate: boolean) {
    if (historyClone.value.length < 1) return

    // Перемещаем последний элемент из истории в будущее
    const last = historyClone.value.pop()
    if (last) {
      future.value.push(last)
      const prev = historyClone.value.at(-1)
      if (prev) {
        setCurrent(prev.resumeData)
        resetResume(prev.resumeData, isCustomTemplate)
        const currentColor = getCurrentColor(prev.resumeData?.themeColor)
        changeColor(currentColor, prev.resumeData)
      }
    }
  }

  function redo(resetResume: Function, isCustomTemplate: boolean) {
    if (future.value.length === 0) return

    // Перемещаем последний элемент из future обратно в историю
    const next = future.value.pop()
    if (next) {
      historyClone.value.push(next)
      setCurrent(next.resumeData)
      resetResume(next.resumeData, isCustomTemplate)
      const currentColor = getCurrentColor(next.resumeData?.themeColor)
      changeColor(currentColor, next.resumeData)
    }
  }

  // function undo(resetResume: Function, isCustomTemplate: boolean) {
  //   if (historyClone.value.length === 0) return // нельзя откатить, если только одно состояние
  //
  //   // Получаем новое текущее состояние
  //   historyClone.value.pop()
  //   const last = historyClone.value.at(-1)
  //   if (last) {
  //     setCurrent(last.resumeData)
  //     const item = {
  //       resumeData: JSON.parse(JSON.stringify(current.value)),
  //       time: new Date().toLocaleString(),
  //     }
  //     // Перемещаем последний элемент из истории в будущее
  //     future.value.push(item)
  //
  //     resetResume(current.value, isCustomTemplate)
  //
  //     const currentColor = getCurrentColor(current.value?.themeColor)
  //     changeColor(currentColor, current.value)
  //   }
  // }

  // function redo(resetResume: Function, isCustomTemplate: boolean) {
  //   if (future.value.length === 0) return
  //
  //   future.value.pop()
  //   const last = future.value.at(-1)
  //
  //   if (last) {
  //     setCurrent(last.resumeData)
  //     const item = {
  //       resumeData: JSON.parse(JSON.stringify(current.value)),
  //       time: new Date().toLocaleString(),
  //     }
  //     historyClone.value.push(item)
  //     resetResume(current.value, isCustomTemplate)
  //     const currentColor = getCurrentColor(current.value?.themeColor)
  //     changeColor(currentColor, current.value)
  //   }
  // }

  const pushHistory = debounce((newValue: ResumeData, oldValue: ResumeData) => {
    // if (isWatching.value) {
    // if (newValue?.profileImage === '') return
    if (newValue?.themeColor !== oldValue?.themeColor) {
      const currentColor = getCurrentColor(newValue?.themeColor)
      changeColor(currentColor, newValue)
    }
    // }
  }, 300)

  return {
    undo,
    redo,
    resetHistory,
    pushHistory,
    push,
    future,
    current,
    historyClone,
    isWatching,
    historyId,
    setCurrent,
    history,
  }
}
