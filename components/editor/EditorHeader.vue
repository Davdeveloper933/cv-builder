<script setup lang="ts">
import Dialog from '~/components/UI/Dialog.vue'
import type { ResumeData } from '~/types'
import useHistory from '~/composables/useHistory'
import Modal from '~/components/UI/Modal.vue'
import useModal from '~/composables/useModal'
import { computed } from 'vue'
import DownloadPDF from '~/components/DownloadPDF.vue'
import LoadingSpinner from '~/components/UI/LoadingSpinner.vue'
import { useRouter } from 'vue-router'
import { useCVState } from '~/data/useCVState'

const props = defineProps<{
  templates: { component: any; data: ResumeData }[]
  template?: ResumeData
  el: HTMLElement | null
  resetResume: Function
  resetSettings: Function
}>()
const route = useRoute()
const loading = ref(false)
const { openPanel, isOpenPanel, closePanel, isOpen, openModal, closeModal } =
  useModal()
const { undo, redo } = useHistory()
const { future, historyClone, current, history } = useCVState()

const isCustomTemplate = computed(() => route.fullPath === '/edit-custom')

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

const canvasRef = ref<HTMLCanvasElement | null>(null)

const loadPdf = async () => {
  if (!props.el) return

  const opt = {
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  }

  const worker = window.html2pdf().set(opt).from(props.el)
  const pdfBlob = await worker.outputPdf('blob')
  const pdfUrl = URL.createObjectURL(pdfBlob)

  const loadingTask = window.pdfjsLib.getDocument(pdfUrl)
  const pdfDoc = await loadingTask.promise

  const page = await pdfDoc.getPage(1)
  const viewport = page.getViewport({ scale: 2 })
  const canvas = canvasRef.value!
  const ctx = canvas.getContext('2d')!

  canvas.width = viewport.width
  canvas.height = viewport.height

  await page.render({ canvasContext: ctx, viewport }).promise
}

const openModalTakeScreenShot = async () => {
  openModal()
  try {
    loading.value = true
    await loadPdf()
  } catch (e) {
    console.error('Error generating PDF preview:', e)
  } finally {
    loading.value = false
  }
}

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <div class="" style="background: #ebeefb">
    <Dialog
      :dialog-title="'History'"
      :is-open-prop="isOpenPanel"
      :close-panel="closePanel"
    >
      <History
        :history="history"
        :reset-resume="resetResume"
        :close-panel="closePanel"
      />
    </Dialog>
    <Modal
      :isOpen="isOpen"
      :max-width="'[793px]'"
      :closeModal="closeModal"
      :openModal="openModal"
    >
      <div class="w-full h-full p-3 relative">
        <LoadingSpinner v-if="loading" />
        <div>
          <div class="flex mb-4 gap-2">
            <div>
              <DownloadPDF class="text-xs md:text-base sm:text-sm" :el="el" />
            </div>

            <div>
              <button
                type="button"
                class="capitalize flex font-bold h-full items-center text-center md:text-base sm:text-sm px-3 md:px-6 md:py-2 py-1 text-xs xs:text-sm lg:text-base rounded-lg shadow transition bg-red-600 text-white hover:bg-red-500"
                @click="closeModal"
              >
                Close
              </button>
            </div>
          </div>
          <canvas ref="canvasRef" style="width: 100%; height: 100%"></canvas>
        </div>
      </div>
    </Modal>

    <div
      class="sticky lg:mx-auto lg:container z-35 w-full top-0 lg:flex lg:items-center lg:justify-between space-y-2 editor-header py-4 px-4 items-center gap-x-4"
    >
      <div class="flex gap-y-2 gap-x-2 min-w-0 flex-1">
        <button
          @click="goBack"
          class="flex justify-center items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r bg-gray-800 text-white transition-colors router-link-active router-link-exact-active hover:bg-gray-900 active:bg-gray-900 active:text-white/80"
        >
          <i class="material-icons font-bold text-xl md:text-2xl">arrow_back</i>
        </button>
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
          class="flex md:hidden justify-center items-center md:gap-3 gap-1 px-3 md:px-6 md:py-2 py-1 rounded-xl bg-gradient-to-r bg-gray-800 text-white transition-colors router-link-active router-link-exact-active hover:bg-gray-900 active:bg-gray-900 active:text-white/80"
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

.history-active {
  background-color: #e2e8f0;
  border-color: #3b82f6;
}
</style>
