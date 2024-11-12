import type { GlobalToastOptions } from '@/types/GlobalToastType'

export function useGlobalToast() {
  const showToast = ref<boolean>(false)
  const toastMessage = ref<string>('')
  const toastType = ref<'success' | 'error' | 'info'>('info')
  const toastTime = ref<number>(2000)

  const showGlobalToast = ({
    message,
    type = 'info',
    time = 2000,
  }: GlobalToastOptions) => {
    toastMessage.value = message
    toastType.value = type
    showToast.value = true

    if (time) {
      setTimeout(() => {
        showToast.value = false
      }, time)
    }
  }

  return {
    showToast,
    toastMessage,
    toastType,
    toastTime,
    showGlobalToast,
  }
}

export function useShowGlobalToast() {
  const showGlobalToast = inject('showGlobalToast') as (
    options: GlobalToastOptions,
  ) => void

  if (!showGlobalToast) {
    throw new Error(
      'showGlobalToast is not provided! Make sure to provide it in your app.vue.',
    )
  }

  return showGlobalToast
}
