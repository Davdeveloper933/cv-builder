<script setup lang="ts">
import { ref, watch } from 'vue'

const { push, current } = useHistoryFunctions()
const props = defineProps<{ label: string }>()
const emit = defineEmits<{ (e: 'update:label', value: string): void }>()

const { toggleEdit, isEditing } = useEditor()
const inputValue = ref(props.label)

watch(
  () => props.label,
  (val) => {
    inputValue.value = val
  },
)

const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('update:label', value)
  push(current.value)
}
</script>

<template>
  <div class="flex justify-between items-center">
    <div v-if="isEditing">
      <input
        :value="inputValue"
        @input="onInput"
        autofocus
        class="px-2 py-1 border rounded"
        @blur="toggleEdit"
        @keydown.enter="toggleEdit"
      />
    </div>
    <h3 v-else-if="props.label" class="font-bold text-sm uppercase">
      {{ props.label }}
    </h3>
    <button
      @click="toggleEdit"
      class="text-gray-500 hover:text-black transition"
    >
      ✏️
    </button>
  </div>
</template>
