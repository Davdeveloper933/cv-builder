<script setup lang="ts">
import DatePicker from '~/components/UI/DatePicker.vue'
import { useCVState } from '~/data/useCVState'

interface SectionWithDates {
  start: Date
  end: Date
  current: boolean
}

interface Props {
  sec: SectionWithDates
  i: number
}

defineProps<Props>()

const { push } = useHistory()
const { current } = useCVState()

const onChangeCurrentDate = () => {
  push(current.value)
}
</script>
<template>
  <div class="space-y-4">
    <label class="flex items-center gap-2">
      <input
        v-model="sec.current"
        @change="onChangeCurrentDate"
        type="checkbox"
      />
      <span class="md:text-sm text-xs">I currently work here</span>
    </label>
    <div class="flex gap-4 flex-wrap">
      <div class="flex-1">
        <DatePicker class="w-full" :label="'From'" v-model="sec.start" />
      </div>
      <div class="flex-1">
        <DatePicker
          :label="'To'"
          class="w-full"
          v-model="sec.end"
          :disabled="sec.current"
          :is-current="sec.current"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
