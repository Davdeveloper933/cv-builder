<script lang="ts" setup>
import { defineModel, ref } from 'vue'
import VueDatePicker, { type DatePickerInstance } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useCVState } from '~/data/useCVState'

interface Props {
  isCurrent?: boolean
  disabled?: boolean
  label?: string
}

withDefaults(defineProps<Props>(), {
  isCurrent: false,
  disabled: false,
  label: 'Basic date picker',
})

const { push } = useHistory()
const { current } = useCVState()

const modelValue = defineModel<Date | string>()
const datepicker = ref<DatePickerInstance>(null)

const onChange = (modelData: Date | string): void => {
  modelValue.value = modelData
  push(current.value)
}

const openMenu = () => {
  if (datepicker.value) datepicker.value.openMenu()
}
</script>
<template>
  <div
    @click="openMenu"
    class="inline-block border cursor-pointer p-3 border-gray-300 rounded relative"
  >
    <label
      class="text-xs md:text-sm text-gray-500 absolute -top-2.5 left-2 px-1 bg-gray-50 z-10"
    >
      {{ label }}
    </label>
    <span class="pretty-date" :class="{ 'text-gray-300': disabled }">{{
      formatDate(modelValue)
    }}</span>
    <VueDatePicker
      @update:model-value="onChange"
      :clearable="false"
      ref="datepicker"
      v-model="modelValue"
      :always-clearable="true"
      :disabled="isCurrent"
      :enable-time-picker="false"
      auto-apply
    />
  </div>
</template>

<style>
.dp__input_wrap {
  width: 100% !important;
  height: 100% !important;
  border: none !important;
  box-shadow: none !important;
  position: absolute !important;
  top: 0;
  left: 0;
  opacity: 0 !important;
  cursor: pointer;
}

.dp--clear-btn {
  display: none !important;
}
</style>
