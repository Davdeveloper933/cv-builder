<script setup lang="ts">
import {
  useCustomTemplatePicker,
  useTemplatePicker,
} from '~/composables/useCVstate'

const route = useRoute()
const isCustomTemplate = computed(() => route.fullPath === '/edit-custom')
const { selectCustomTemplate } = useCustomTemplatePicker()
const { selectTemplate, selectedIndex } = useTemplatePicker(TEMPLATES)
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <header>
    <nav class="bg-white">
      <div
        class="mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-between py-8"
      >
        <div class="relative z-10 flex items-center gap-16">
          <NuxtLink aria-label="Home" to="/"
            ><img src="/images/logo.png" class="w-40" alt="logo"
          /></NuxtLink>
          <div class="hidden md:flex md:gap-10">
            <NuxtLink
              to="/templates"
              class="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0"
              ><span class="relative z-10">Templates</span></NuxtLink
            >
            <NuxtLink
              to="/edit-custom"
              class="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0"
              ><span class="relative z-10">
                <!--              @click="selectCustomTemplate(!isCustomTemplate)"-->
                Build Resume from Scratch</span
              ></NuxtLink
            >
          </div>
        </div>
        <div class="flex items-center gap-6">
          <div class="md:hidden" data-headlessui-state="open" data-open="">
            <button
              @click="toggleMenu"
              class="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 focus:not-data-focus:outline-hidden active:stroke-gray-900"
              aria-label="Toggle site navigation"
              type="button"
              aria-expanded="true"
              data-headlessui-state="open active"
              id="headlessui-popover-button-:R1epfja:"
              data-open=""
              data-active=""
              aria-controls="headlessui-popover-panel-:r1u:"
            >
              <svg
                v-if="isOpen"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                class="h-6 w-6"
              >
                <path
                  d="M17 14l-5-5-5 5"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                class="h-6 w-6"
              >
                <path
                  d="M5 6h14M5 18h14M5 12h14"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <div
              v-if="isOpen"
              class="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur-sm"
              id="headlessui-popover-backdrop-:r1t:"
              aria-hidden="true"
              data-headlessui-state="open"
              data-open=""
              style="opacity: 1"
            ></div>
            <!-- v-if -->
            <div
              v-if="isOpen"
              class="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pt-32 pb-6 shadow-2xl shadow-gray-900/20"
              id="headlessui-popover-panel-:r1u:"
              tabindex="-1"
              data-headlessui-state="open"
              data-open=""
              style="--button-width: 40px; opacity: 1; transform: none"
            >
              <div class="space-y-4">
                <NuxtLink
                  to="/templates"
                  class="block text-base/7 tracking-tight text-gray-700"
                  data-headlessui-state="open active"
                  data-open=""
                  data-active=""
                  >Templates</NuxtLink
                ><NuxtLink
                  class="block text-base/7 tracking-tight text-gray-700"
                  data-headlessui-state="open active"
                  data-open=""
                  data-active=""
                  to="/edit-custom"
                >
                  <!--                @click="selectCustomTemplate(!isCustomTemplate)"-->
                  Build Resume from Scratch</NuxtLink
                >
              </div>
              <div class="mt-8 flex flex-col gap-4">
                <NuxtLink
                  class="inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold transition-colors bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80"
                  variant="solid"
                  color="gray"
                  to="/edit"
                >
                  <!--                  @click="selectTemplate(selectedIndex, !isCustomTemplate)"-->
                  Try for free</NuxtLink
                >
              </div>
            </div>
            <!-- v-if -->
          </div>
          <div class="flex items-center gap-6 max-md:hidden">
            <NuxtLink
              to="/edit"
              class="inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold transition-colors bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80"
              variant="solid"
              color="gray"
            >
              <!--              @click="selectTemplate(selectedIndex, !isCustomTemplate)"-->
              Try for free</NuxtLink
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.ff {
  color: #ebeefb;
}
</style>
