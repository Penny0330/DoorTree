import { nanoid } from 'nanoid'
import type { SectionItem } from '@/types/MainType'

const generateNumber = (): number => Math.floor(Math.random() * 1000) + 1

const createTextSection = (): SectionItem => {
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

const createDividerSection = (): SectionItem => {
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

const createButtonSection = (): SectionItem => {
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

const createLogoWallSection = (): SectionItem => {
  return {
    type: 'LOGO_WALL',
    id: nanoid(),
    isShow: false,
    logoList: [
      {
        id: nanoid(),
        icon: 'majesticons:mail-line',
        link: '',
        toolTip: 'E-mail',
      },
    ],
  }
}

const createImageSingleSection = (): SectionItem => {
  return {
    type: 'IMAGE_SINGLE',
    id: nanoid(),
    isShow: false,
    link: '',
    image: `https://picsum.photos/id/${generateNumber()}/400/400`,
    tag: {
      text: '',
      textAlign: 'left-4',
      bgColor: 'default',
    },
    description: {
      text: '',
      textAlign: 'text-left',
    },
  }
}

const createImageDoubleSection = (): SectionItem => {
  return {
    type: 'IMAGE_DOUBLE',
    id: nanoid(),
    isShow: false,
    imageList: [
      {
        id: nanoid(),
        link: '',
        image: `https://picsum.photos/id/${generateNumber()}/400/400`,
        tag: {
          text: '',
          textAlign: 'left-4',
          bgColor: 'default',
        },
        description: {
          text: '',
          textAlign: 'text-left',
        },
      },
      {
        id: nanoid(),
        link: '',
        image: `https://picsum.photos/id/${generateNumber()}/400/400`,
        tag: {
          text: '',
          textAlign: 'left-4',
          bgColor: 'default',
        },
        description: {
          text: '',
          textAlign: 'text-left',
        },
      },
    ],
  }
}

const createImageRectangleSection = (): SectionItem => {
  return {
    type: 'IMAGE_RECTANGLE',
    id: nanoid(),
    isShow: false,
    link: '',
    image: `https://picsum.photos/id/${generateNumber()}/400/200`,
    tag: {
      text: '',
      textAlign: 'left-4',
      bgColor: 'default',
    },
    description: {
      text: '',
      textAlign: 'text-left',
    },
  }
}

export const sectionCreators: Record<string, () => SectionItem> = {
  TEXT: createTextSection,
  DIVIDER: createDividerSection,
  BUTTON: createButtonSection,
  LOGO_WALL: createLogoWallSection,
  IMAGE_SINGLE: createImageSingleSection,
  IMAGE_DOUBLE: createImageDoubleSection,
  IMAGE_RECTANGLE: createImageRectangleSection,
}
