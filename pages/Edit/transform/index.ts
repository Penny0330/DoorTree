import { nanoid } from 'nanoid'
import type { SectionItem } from '@/types/MainType'

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
  type: 'TEXT' | 'IMAGE' | 'BUTTON',
): SectionItem {
  switch (type) {
    case 'TEXT':
      return {
        type: 'TEXT',
        id: nanoid(),
        text: 'header / paragraph',
        isShow: false,
      }
    case 'IMAGE':
      return {
        type: 'IMAGE',
        id: nanoid(),
        src: '',
        isShow: false,
      }
    case 'BUTTON':
      return {
        type: 'BUTTON',
        id: nanoid(),
        label: 'Button Text',
        link: '',
        isShow: false,
      }
    default:
      throw new Error(`Invalid block type: ${type}`)
  }
}
