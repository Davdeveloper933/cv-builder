<script lang="ts" setup>
import { defineModel } from 'vue'
import { formatDate } from '~/utils/helpers'

const { push, current } = useHistoryFunctions()

defineProps({
  isCurrent: Boolean,
  disabled: Boolean,
  label: {
    type: String,
    default: 'Basic date picker',
  },
})

const modelValue = defineModel<Date | string>()
const convertedModelValue = ref(formatDate(modelValue.value))
const onChange = (event: Event): void => {
  const target = event.target as HTMLInputElement
  modelValue.value = target.value
  push(current.value)
}
</script>

<template>
  <div class="inline-block border border-gray-300 rounded px-3 py-2 relative">
    <label
      class="text-xs md:text-sm text-gray-500 absolute -top-2.5 left-2 px-1 bg-white z-10"
    >
      {{ label }}
    </label>
    <div class="flex items-center gap-2 pt-0 justify-between">
      <span :class="{ 'text-gray-300': disabled }">{{
        convertedModelValue
      }}</span>
      <input
        ref="date-input"
        v-model="convertedModelValue"
        :disabled="disabled"
        class="text-black text-sm md:text-lg font-medium focus:outline-none"
        placeholder="End date"
        type="date"
        :value="convertedModelValue"
        @change="onChange"
      />
      <span
        class="material-icons"
        :class="{ 'text-gray-300': disabled, 'text-pink-500': !disabled }"
      >
        date_range
      </span>
    </div>
  </div>
</template>

<style scoped>
input[type='date']::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

input[type='date'] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
