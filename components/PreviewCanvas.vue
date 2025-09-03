<!--<template>-->
<!--  <div>-->
<!--    <canvas ref="canvasRef"></canvas>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import type { ResumeData } from '~/types'-->

<!--const props = defineProps<{-->
<!--  cvref: HTMLElement | null-->
<!--  resumeData: ResumeData | null-->
<!--}>()-->
<!--const canvasRef = ref<HTMLCanvasElement | null>(null)-->

<!--const loadPdf = async (cvref: HTMLElement | null) => {-->
<!--  if (!cvref) return-->

<!--  // генерируем PDF через html2pdf-->
<!--  const opt = {-->
<!--    html2canvas: { scale: 2 },-->
<!--    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },-->
<!--  }-->
<!--  const worker = window.html2pdf().set(opt).from(cvref)-->
<!--  const pdfBlob = await worker.outputPdf('blob')-->
<!--  const pdfUrl = URL.createObjectURL(pdfBlob)-->

<!--  const loadingTask = window.pdfjsLib.getDocument(pdfUrl)-->
<!--  const pdfDoc = await loadingTask.promise-->

<!--  // рендерим всегда первую страницу-->
<!--  const page = await pdfDoc.getPage(1)-->
<!--  const viewport = page.getViewport({ scale: 2 })-->
<!--  const canvas = canvasRef.value!-->
<!--  const ctx = canvas.getContext('2d')!-->

<!--  canvas.width = viewport.width-->
<!--  canvas.height = viewport.height-->

<!--  await page.render({ canvasContext: ctx, viewport }).promise-->
<!--}-->

<!--onMounted(async () => {-->
<!--  if (!props.resumeData) return-->
<!--  await nextTick()-->
<!--  await nextTick()-->
<!--  await loadPdf(props.cvref)-->
<!--})-->

<!--watch(-->
<!--  () => props.resumeData,-->
<!--  async (newVal) => {-->
<!--    if (!newVal) return-->
<!--    await nextTick()-->
<!--    await loadPdf(props.cvref)-->
<!--  },-->
<!--)-->
<!--</script>-->

<template>
  <div>
    <canvas ref="canvasRef" class="rounded shadow" />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import type { ResumeData } from '~/types'

const props = defineProps<{
  cvref: HTMLElement | null
  resumeData: ResumeData | null
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

const loadPdf = async () => {
  if (!props.cvref || !canvasRef.value) return

  // Генерация PDF из HTML-элемента
  const opt = {
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  }

  const worker = window.html2pdf().set(opt).from(props.cvref)
  const pdfBlob = await worker.outputPdf('blob')
  const pdfUrl = URL.createObjectURL(pdfBlob)

  // Рендерим PDF (первая страница)
  const loadingTask = window.pdfjsLib.getDocument(pdfUrl)
  const pdfDoc = await loadingTask.promise
  const page = await pdfDoc.getPage(1)

  const viewport = page.getViewport({ scale: 2, rotation: 0 })
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  ctx.translate(0, canvas.height)
  ctx.scale(1, -1)
  canvas.width = viewport.width
  canvas.height = viewport.height

  await page.render({ canvasContext: ctx, viewport }).promise
}

onMounted(async () => {
  if (props.resumeData) {
    await nextTick()
    await loadPdf()
  }
})

watch(
  () => props.resumeData,
  async (val) => {
    if (val) {
      await nextTick()
      await loadPdf()
    }
  },
  { deep: true, immediate: true, flush: 'post' },
)
</script>
