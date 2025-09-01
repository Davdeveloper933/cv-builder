<script setup lang="ts">
const props = defineProps(['el'])
const downloadPDF = () => {
  const element = props.el
  if (!element) return

  const opt = {
    margin: 0,
    html2canvas: {
      scale: 2,
    },
  }

  window.html2pdf().set(opt).from(element).save()
}
</script>

<template>
  <div class="text-center">
    <button
      @click="downloadPDF"
      class="bg-blue-600 flex font-bold justify-center items-center md:gap-2 gap-1 hover:bg-blue-700 text-white px-3 md:px-6 md:py-2 py-1 rounded-lg shadow transition"
    >
      <span class="hidden sm:block">Download</span> PDF
      <i
        class="material-icons font-bold text-lg sm:text-xl md:text-2xl"
        style="color: white"
        >download</i
      >
    </button>
  </div>
</template>

<style scoped></style>
