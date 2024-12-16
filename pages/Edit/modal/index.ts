import dayjs from 'dayjs'
import { nanoid } from 'nanoid'
import type { EditDetail, SectionItem } from '@/types/MainType'
import type { DashboardItem } from '@/types/DashboardType'

const generateNumber = (): number => Math.floor(Math.random() * 1000) + 1

export const DefaultDashboardItem: DashboardItem = {
  id: nanoid(),
  title: '',
  link: '',
  avatar: '',
  updateTime: dayjs().format('YYYY/MM/DD HH:mm'),
}

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
      color: 'default',
    },
  }
}

const createDividerSection = (): SectionItem => {
  return {
    type: 'DIVIDER',
    id: nanoid(),
    isShow: false,
    style: {
      type: 'border-solid',
      width: 'border-b',
      color: 'black',
    },
  }
}

const createButtonSection = (): SectionItem => {
  return {
    type: 'BUTTON',
    id: nanoid(),
    isShow: false,
    text: 'Button',
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
        type: 'E-mail',
        icon: 'majesticons:mail-line',
        link: '',
        toolTip: 'E-mail',
        placeholder: 'xxx@gmail.com',
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

export const DefaultEditDetail: EditDetail = {
  id: '',
  link: '',
  showQRCodeBtn: true,
  showShareBtn: true,
  profile: {
    title: '',
    description: 'Welcome to my DoorTree!',
    avatar: '',
  },
  section: [createTextSection()],
  themeColor: 'default',
  bgColor: 'white',
}
