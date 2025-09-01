<script setup lang="ts">
import { useHistory } from '~/composables/states'
import Dialog from '~/components/UI/Dialog.vue'
import type { ResumeData } from '~/types'
import useHistoryFunctions from '~/composables/useHistoryFunctions'
import Modal from '~/components/UI/Modal.vue'
import useModal from '~/composables/useModal'
import { computed } from 'vue'
import DownloadPDF from '~/components/DownloadPDF.vue'

const props = defineProps<{
  templates: { component: any; data: ResumeData }[]
  template: ResumeData
  el: HTMLElement | null
  resetResume: Function
  resetSettings: Function
}>()
const route = useRoute()
const isCustomTemplate = computed(() => route.fullPath === '/edit-custom')
const history = useHistory()
const forPreview = {
  cols: '3',
  span: '2',
  maxWidth: 'full',
}
const resumePreview = ref<HTMLElement | null>(null)

const { openPanel, isOpenPanel, closePanel, isOpen, openModal, closeModal } =
  useModal()
const { undo, future, redo, historyClone, current } = useHistoryFunctions()
const { changeColor, getCurrentColor } = useEditor()

const loadHistoryChange = (
  resetResume: Function,
  data: ResumeData,
  index: number,
) => {
  resetResume(data, isCustomTemplate.value)
  changeColor(getCurrentColor(data.themeColor), data)
  closePanel()
}

const isUndoButtonDisabled = computed(() => {
  if (historyClone.value.length <= 1 && future.value.length === 0) {
    return true
  } else if (future.value.length > 0 && !historyClone.value.length) {
    return true
  }
  return false
})

const getCurrentTemplateComponent = () => {
  const template = TEMPLATES.find((t) => t.data.id === current.value.id)
  return template ? template.component : null
}

const previewSrc = ref('')

const pdfUrl = ref('')
const pdfDoc: any = ref(null)
const pageNum = ref(1)
const scale = ref(1.0)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const loadPdf = async () => {
  if (!props.el) return

  // генерируем PDF через html2pdf
  const opt = {
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  }
  const worker = window.html2pdf().set(opt).from(props.el)
  const pdfBlob = await worker.outputPdf('blob')
  const pdfUrl = URL.createObjectURL(pdfBlob)

  const loadingTask = window.pdfjsLib.getDocument(pdfUrl)
  const pdfDoc = await loadingTask.promise

  // рендерим всегда первую страницу
  const page = await pdfDoc.getPage(1)
  const viewport = page.getViewport({ scale: 2 })
  const canvas = canvasRef.value!
  const ctx = canvas.getContext('2d')!

  canvas.width = viewport.width
  canvas.height = viewport.height

  await page.render({ canvasContext: ctx, viewport }).promise
}

const previewPDF = async () => {
  if (!props.el) return

  const opt = {
    html2canvas: { scale: 4 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  }

  // Создаём worker, но не вызываем .save() или .outputPdf()
  const worker = window.html2pdf().set(opt).from(props.el)

  // Получаем blob
  const pdfBlob = await worker.outputPdf('blob')
  pdfUrl.value = URL.createObjectURL(pdfBlob)
}
const openModalTakeScreenShot = async () => {
  openModal()
  await loadPdf()
}
</script>

<template>
  <div class="editor-header px-4 md:px-0">
    <Dialog :is-open-prop="isOpenPanel" :close-panel="closePanel">
      <div class="space-y-4">
        <div
          v-for="(change, index) in history"
          :key="change.id"
          @click="loadHistoryChange(resetResume, change.resumeData, index)"
          class="flex justify-between cursor-pointer transition border rounded-lg p-3 hover:border-gray-400 hover:bg-slate-300 border-gray-200 bg-slate-200 items-center"
        >
          <span>Change {{ change.id }}</span>
          <span>{{ change.time }}</span>
        </div>
      </div>
    </Dialog>
    <Modal
      :isOpen="isOpen"
      :max-width="'[793px]'"
      :closeModal="closeModal"
      :openModal="openModal"
    >
      <div class="w-full p-3">
        <!--        -mt-9-->
        <!--        <iframe-->
        <!--          :src="pdfUrl"-->
        <!--          class="w-full iframe"-->
        <!--          style="min-height: 100vh"-->
        <!--          title="PDF Preview"-->
        <!--        ></iframe>-->
        <canvas ref="canvasRef" style="width: 100%; height: auto"></canvas>
      </div>
    </Modal>

    <div
      style="background: #ebeefb"
      class="sticky z-35 w-full top-0 lg:flex lg:items-center lg:justify-between space-y-2 editor-header py-4 items-center gap-x-4"
    >
      <div class="flex gap-y-2 gap-x-2 min-w-0 flex-1">
        <DownloadPDF class="text-xs md:text-base sm:text-sm" :el="el" />
        <div>
          <button
            class="flex justify-center items-center md:gap-3 gap-1 px-3 md:px-6 md:py-2 py-1 rounded-xl bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white shadow transition"
            @click="resetSettings(resetResume, template, isCustomTemplate)"
          >
            <span
              class="font-semibold hidden sm:block tracking-wide text-xs md:text-base sm:text-sm"
              >Reset Settings</span
            >
            <i class="material-icons text-xl md:text-2xl">change_circle</i>
          </button>
        </div>
        <button
          @click="openModalTakeScreenShot"
          class="flex justify-center items-center md:gap-3 gap-1 px-3 md:px-6 md:py-2 py-1 rounded-xl bg-gradient-to-r bg-gray-800 text-white transition-colors router-link-active router-link-exact-active hover:bg-gray-900 active:bg-gray-900 active:text-white/80"
        >
          <span
            class="font-semibold hidden sm:block tracking-wide text-xs md:text-base sm:text-sm"
            >Preview</span
          >
          <i class="material-icons text-xl md:text-2xl">visibility</i>
        </button>
      </div>
      <div class="flex lg:mt-0 lg:ml-4 md:gap-2 gap-1">
        <div class="flex md:gap-2 gap-1">
          <!-- Undo Button -->
          <button
            :disabled="isUndoButtonDisabled"
            @click="() => undo(resetResume, isCustomTemplate)"
            class="flex disabled:bg-gray-600 items-center gap-1 md:px-3 px-2 md:py-2 text-white bg-gray-900 hover:bg-gray-800 text-sm rounded-md"
          >
            <i class="material-icons text-sm md:text-xl">undo</i>
          </button>

          <!-- Redo Button -->
          <button
            :disabled="future.length === 0"
            @click="() => redo(resetResume, isCustomTemplate)"
            class="flex disabled:bg-gray-600 items-center gap-1 md:px-3 px-2 md:py-2 text-white bg-gray-900 hover:bg-gray-800 text-sm rounded-md"
          >
            <i class="material-icons text-sm md:text-xl">redo</i>
          </button>
        </div>
        <div class="flex">
          <button
            @click="openPanel"
            class="capitalize router-link-active router-link-exact-active inline-flex justify-center rounded-lg py-2 px-3 text-xs md:text-base sm:text-sm font-semibold transition-colors bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-900 active:text-white/80"
          >
            show history
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resume-preview > .template-wrapper {
  max-width: 100% !important;
}

.iframe #mainContainer .toolbar {
  display: none !important;
}

#toolbarContainer {
  display: none !important;
}
</style>
