<script setup lang="ts">
import type { ResumeData } from '~/types'
import type { EditorHistory } from '~/types/editor'
import { computed } from 'vue'
import { useCVState } from '~/data/useCVState'

interface Props {
  history: EditorHistory
  resetResume: Function
  closePanel: () => void
}

const props = defineProps<Props>()
const { activeId, setActiveId, getActiveId } = useCVState()
const { changeColor, getCurrentColor } = useThemeColor()
const route = useRoute()
const isCustomTemplate = computed(() => route.fullPath === '/edit-custom')

onMounted(() => {
  activeId.value = getActiveId()
})

const loadHistoryChange = (
  resetResume: props.resetResume,
  data: ResumeData,
  id: number,
) => {
  setActiveId(id)
  resetResume(data, isCustomTemplate.value)
  changeColor(getCurrentColor(data.themeColor), data)
  props.closePanel()
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="change in history"
      :key="change.id"
      @click="loadHistoryChange(resetResume, change.resumeData, change.id)"
      :class="{
        'bg-blue-50 border-blue-300': activeId === change.id,
        ' bg-slate-100 border-slate-200': activeId !== change.id,
      }"
      class="flex justify-between items-center px-4 py-2 mb-2 rounded-lg border hover:bg-slate-200 hover:border-blue-400 cursor-pointer transition-colors duration-150"
    >
      <span class="font-medium text-slate-700">Change </span>
      <span class="text-slate-500 text-sm">{{ change.time }}</span>
    </div>
  </div>
</template>

<style scoped></style>
