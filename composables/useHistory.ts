// useHistory.ts
import type { ResumeData } from '~/types'
import cloneDeep from 'lodash-es/cloneDeep'
import { debounce } from 'lodash-es'
import { useCVState } from '~/data/useCVState'
import useThemeColor from '~/composables/useThemeColor'

export default function useHistory() {
  const { historyId, historyClone, history, current, future, isWatching } =
    useCVState()
  const { changeColor, getCurrentColor } = useThemeColor()

  const MAX_HISTORY_LENGTH = 30
  const setCurrent = (data: ResumeData) => {
    current.value = data
  }

  const truncateHistory = (history: any[], maxLength: number) => {
    while (history.length > maxLength) {
      history.shift()
    }
  }

  const push = debounce((data: ResumeData) => {
    if (!data) return

    truncateHistory(history.value, MAX_HISTORY_LENGTH)
    const dataClone = cloneDeep(data)
    const item = {
      id: historyId.value++,
      resumeData: dataClone,
      time: new Date().toLocaleString(),
    }
    history.value.push(item)
    historyClone.value = cloneDeep(history.value)
  }, 300)

  const resetHistory = () => {
    history.value = []
    future.value = []
    historyClone.value = []
    historyId.value = 1
  }

  function undo(resetResume: Function, isCustomTemplate: boolean) {
    if (historyClone.value.length < 1) return

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

    const next = future.value.pop()
    if (next) {
      historyClone.value.push(next)
      setCurrent(next.resumeData)
      resetResume(next.resumeData, isCustomTemplate)
      const currentColor = getCurrentColor(next.resumeData?.themeColor)
      changeColor(currentColor, next.resumeData)
    }
  }

  return {
    undo,
    redo,
    resetHistory,
    push,
    setCurrent,
    isWatching,
  }
}
