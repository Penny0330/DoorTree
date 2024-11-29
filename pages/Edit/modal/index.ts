import { nanoid } from 'nanoid'
import type { SectionItem } from '@/types/MainType'

function createTextSection(): SectionItem {
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
}

function createDividerSection(): SectionItem {
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
}

function createButtonSection(): SectionItem {
  return {
    type: 'BUTTON',
    id: nanoid(),
    isShow: false,
    text: '',
    link: '',
    showDescription: false,
    description: '',
    isFill: false,
    style: {
      fontSize: 'text-base',
    },
  }
}

export const sectionCreators: Record<string, () => SectionItem> = {
  TEXT: createTextSection,
  DIVIDER: createDividerSection,
  BUTTON: createButtonSection,
}
