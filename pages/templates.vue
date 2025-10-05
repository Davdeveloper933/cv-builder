<template>
  <section>
    <div class="container mx-auto">
      <div class="flex mx-auto flex-wrap items-center justify-center">
        <Modal
          :isOpen="isOpen"
          :max-width="'md'"
          :closeModal="closeModal"
          :openModal="openModal"
        >
          <TemplatePreview
            :src="paginatedData[selectedIndex].img"
            :selected-index="templateIndex"
            :close-modal="closeModal"
          />
        </Modal>
        <div
          class="flex-shrink-0 cursor-pointer transition-all group/template m-3 relative overflow-hidden rounded-lg sm:max-w-xs max-w-52 shadow-lg"
          v-for="(tmpl, index) in paginatedData"
          :key="tmpl.data.id"
        >
          <div
            @click="openCurrentTemplate(index, Number(tmpl.data.id))"
            class="w-full transition invisible cursor-pointer flex justify-center items-center opacity-50 h-full z-10 absolute bg-gray-800 group/template group-hover/template:visible"
          >
            <i class="material-icons" style="font-size: 48px; color: white"
              >visibility</i
            >
          </div>
          <img :src="tmpl.img" class="relative" alt="" />
        </div>
      </div>
    </div>
    <Pagination
      :data="TEMPLATES"
      :paginatedData="paginatedData"
      :perPage="perPage"
      :page="page"
      :nextPage="nextPage"
      :backPage="backPage"
      :goToPage="goToPage"
      :count-pages="countPages"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TEMPLATES } from '~/utils/constants'
import Pagination from '~/components/UI/Pagination.vue'
import usePagination from '~/composables/usePagination'
import Modal from '~/components/UI/Modal.vue'
import useModal from '~/composables/useModal'
import { useCVState } from '~/data/useCVState'

const { isOpen, openModal, closeModal } = useModal()
const perPage = 3
const { templateIndex } = useCVState()
const selectedIndex = ref(0)
const { countPages, paginatedData, page, nextPage, backPage, goToPage } =
  usePagination(TEMPLATES, perPage)

const openCurrentTemplate = (index: number, id: number) => {
  templateIndex.value = id
  selectedIndex.value = index
  openModal()
}
</script>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: visibility 1.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
