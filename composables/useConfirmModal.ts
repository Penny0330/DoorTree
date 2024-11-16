import type { ConfirmModalOptions } from '@/types/ConfirmModalType'

export function useConfirmModal() {
  const showModal = ref(false)
  const confirmModalOptions = reactive<ConfirmModalOptions>({
    modalTitle: '',
    content: '',
    customIcon: 'mdi:error-outline',
    customIconColor: 'text-orange-400',
    cancelBtnText: 'cancel',
    okBtnText: 'confirm',
    isDanger: false,
    confirmLoading: false,
    onOk: undefined,
  })

  const showConfirmModal = (options: ConfirmModalOptions = {}) => {
    Object.assign(confirmModalOptions, options)
    showModal.value = true
  }

  const closeConfirmModal = () => {
    showModal.value = false
  }

  return {
    showModal,
    confirmModalOptions,
    showConfirmModal,
    closeConfirmModal,
  }
}

export function useShowConfirmModal() {
  const showConfirmModal = inject('showConfirmModal') as (
    options: ConfirmModalOptions,
  ) => void
  if (!showConfirmModal) {
    throw new Error('useShowConfirmModal must be used within a provider')
  }
  return showConfirmModal
}
