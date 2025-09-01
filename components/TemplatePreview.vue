<script setup lang="ts">
import { useTemplatePicker } from '~/composables/useCVstate.js'
import { TEMPLATES } from '~/utils/constants'

const route = useRoute()
const isCustomTemplate = computed(() => route.fullPath === '/edit-custom')

const props = defineProps(['src', 'selectedIndex', 'closeModal', 'isOpen'])
const { selectTemplate } = useTemplatePicker(TEMPLATES)

const customize = () => {
  selectTemplate(props.selectedIndex, isCustomTemplate.value)
  props.closeModal()
}
</script>

<template>
  <div class="p-3">
    <img :src="src" alt="img" class="rounded-2xl" />

    <div class="mt-4 flex items-center space-x-2 lg:space-x-4">
      <button
        type="button"
        class="capitalize px-3 py-2 lg:px-6 lg:py-2 text-xs xs:text-sm lg:text-base rounded-lg shadow transition bg-red-600 text-white hover:bg-red-500"
        @click="closeModal"
      >
        Cancel
      </button>
      <button
        type="button"
        class="capitalize px-3 py-2 lg:px-6 lg:py-2 bg-blue-600 text-xs xs:text-sm lg:text-base hover:bg-blue-700 text-white rounded-lg shadow transition"
        @click="customize"
      >
        Customize
      </button>
    </div>
  </div>
</template>

<style scoped></style>
