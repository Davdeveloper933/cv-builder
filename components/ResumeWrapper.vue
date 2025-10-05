<template>
  <!-- ResumeWrapper.vue -->
  <div :class="wrapperClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue' // Позволяет переопределять размеры через props, если нужно

// Позволяет переопределять размеры через props, если нужно
interface Props {
  widthClass?: string
  heightClass?: string
  minHeightClass?: string
  maxHeightClass?: string
}

const props = defineProps<Props>()

const DEFAULT_WIDTH = 'max-w-[793px]'
const DEFAULT_HEIGHT = 'min-h-[1122px]'
const DEFAULT_MIN_WIDTH = 'min-w-[793px]'
const DEFAULT_MAX_HEIGHT = 'max-h-[1122px]'

const wrapperClasses = computed(() => {
  return [
    props.widthClass || DEFAULT_WIDTH,
    props.heightClass || DEFAULT_HEIGHT,
    props.minHeightClass || DEFAULT_MIN_WIDTH,
    props.maxHeightClass || DEFAULT_MAX_HEIGHT,
    'mx-auto',
    'overflow-hidden',
  ].join(' ')
})
</script>

<style scoped>
/* Здесь можно добавить общие стили для резюме */
</style>
