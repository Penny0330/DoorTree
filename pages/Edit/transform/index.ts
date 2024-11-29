import type { SectionItem } from '@/types/MainType'
import { sectionCreators } from '@/pages/Edit/modal/index'

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

// TODO 待完成其他 type 的 params
export function createNewSection(
  type: 'TEXT' | 'DIVIDER' | 'BUTTON',
): SectionItem {
  const createSection = sectionCreators[type]
  if (!createSection) {
    throw new Error(`Invalid block type: ${type}`)
  }
  return createSection()
}

export const fontSizeOptions = [
  { value: 'text-base', label: 'Small' },
  { value: 'text-xl', label: 'Medium' },
  { value: 'text-3xl', label: 'Large' },
  { value: 'text-4xl', label: 'Extra-Large' },
]

export const textAlignOptions = [
  { value: 'text-left', label: 'Left' },
  { value: 'text-center', label: 'Center' },
  { value: 'text-right', label: 'Right' },
]
