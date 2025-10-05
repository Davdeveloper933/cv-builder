import type { Template } from '~/types'

export default function usePagination(data: Template[], perPage: number) {
  const page = ref(1)
  const countPages = Math.ceil(data.length / perPage)

  const paginatedData = computed(() =>
    data.slice((page.value - 1) * perPage, page.value * perPage),
  )

  const nextPage = () => {
    if (page.value !== Math.ceil(data.length / perPage)) {
      page.value += 1
    }
  }

  const backPage = () => {
    if (page.value !== 1) {
      page.value -= 1
    }
  }

  const goToPage = (numPage: number) => {
    page.value = numPage
  }

  return { data, countPages, paginatedData, page, nextPage, backPage, goToPage }
}
