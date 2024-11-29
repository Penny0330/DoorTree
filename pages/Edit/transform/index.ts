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
export function createNewSection(type: 'TEXT' | 'DIVIDER'): SectionItem {
  switch (type) {
    case 'TEXT':
      return {
        type: 'TEXT',
        id: nanoid(),
        isShow: false,
        text: 'header / paragraph',
      }
    case 'DIVIDER':
      return {
        type: 'DIVIDER',
        id: nanoid(),
        isShow: true,
        style: {
          type: 'border-solid',
          width: 'border-b',
          color: 'border-black',
        },
      }
    default:
      throw new Error(`Invalid block type: ${type}`)
  }
}
