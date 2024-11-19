export function useEditModal() {
  const showEditModal = ref<boolean>(false)

  const openModal = () => {
    showEditModal.value = true
  }

  const closeModal = () => {
    showEditModal.value = false
  }

  return {
    showEditModal,
    openModal,
    closeModal,
  }
}
