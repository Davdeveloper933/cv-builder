import { ref } from 'vue'

export default function useModal() {
  const isOpen = ref(false)
  const isOpenPanel = ref(false)

  function closeModal() {
    isOpen.value = false
  }
  function openModal() {
    isOpen.value = true
  }

  function closePanel() {
    isOpenPanel.value = false
  }
  function openPanel() {
    isOpenPanel.value = true
  }

  return { isOpen, closeModal, openModal, isOpenPanel, closePanel, openPanel }
}
