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
        style: {
          fontSize: 'text-base',
          isBold: false,
          isUnderline: false,
          isItalic: false,
          textAlign: 'text-center',
          color: 'text-black',
        },
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
