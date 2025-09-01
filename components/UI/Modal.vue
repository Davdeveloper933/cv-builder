<template>
  <!--  <div-->
  <!--    @click="openModal"-->
  <!--    class="w-full transition invisible cursor-pointer flex justify-center items-center opacity-50 h-full z-10 absolute bg-gray-800 group/template group-hover/template:visible"-->
  <!--  >-->
  <!--    <i class="material-icons" style="font-size: 48px; color: white"-->
  <!--      >visibility</i-->
  <!--    >-->
  <!--  </div>-->
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full relative z-40 items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="'max-w-' + maxWidth"
              class="w-full container transform relative z-20 overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
            >
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
// import { useTemplatePicker } from '~/composables/useCVstate.js'
// import { TEMPLATES } from '~/utils/constants'
//
// const { selectTemplate } = useTemplatePicker(TEMPLATES)

// defineProps(['isOpen', 'closeModal', 'openModal'])
const props = withDefaults(
  defineProps<{
    maxWidth: string
    isOpen: boolean
    closeModal: Function
    openModal: Function
  }>(),
  {
    maxWidth: 'sm',
  },
)

// const customize = () => {
//   selectTemplate(props.selectedIndex)
//   closeModal()
// }
</script>
