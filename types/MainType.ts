// 共同基礎類型
interface BaseSection {
  type: string
  isShow: boolean
}

interface TextSection extends BaseSection {
  type: 'TEXT'
  id: string
  text: string
  style: {
    fontSize: 'text-base' | 'text-xl' | 'text-3xl' | 'text-4xl'
    isBold: boolean
    isUnderline: boolean
    isItalic: boolean
    textAlign: 'text-left' | 'text-center' | 'text-right'
    color: string
  }
}

interface DividerSection extends BaseSection {
  type: 'DIVIDER'
  id: string
  style: {
    type: 'border-solid' | 'border-dashed' | 'border-dotted' | 'border-double'
    width: 'border-b' | 'border-b-2' | 'border-b-4' | 'border-b-8'
    color: string
  }
}

interface ButtonSection extends BaseSection {
  type: 'BUTTON'
  id: string
  text: string
  link: string
  showDescription: boolean
  description: string
  isFill: boolean
  style: {
    fontSize: 'text-base' | 'text-xl' | 'text-3xl' | 'text-4xl'
  }
}

interface LogoWallSection extends BaseSection {
  type: 'LOGO_WALL'
  id: string
  logoList: Array<{
    id: string
    link: string
    type: string
    icon?: string
    toolTip?: string
    placeholder?: string
  }>
}

interface ImageSingleSection extends BaseSection {
  type: 'IMAGE_SINGLE'
  id: string
  link: string
  previewImage?: string
  previewImageFile?: File
  image: string
  tag: {
    text: string
    textAlign: 'left-4' | 'right-4'
    bgColor: string
  }
  description: {
    text: string
    textAlign: 'text-left' | 'text-right'
  }
}

export interface ImageDoubleSection extends BaseSection {
  type: 'IMAGE_DOUBLE'
  id: string
  imageList: Array<{
    id: string
    link: string
    previewImage?: string | null
    previewImageFile?: File | null
    image: string
    tag: {
      text: string
      textAlign: 'left-4' | 'right-4'
      bgColor: string
    }
    description: {
      text: string
      textAlign: 'text-left' | 'text-right'
    }
  }>
}

interface ImageRectangleSection extends BaseSection {
  type: 'IMAGE_RECTANGLE'
  id: string
  link: string
  previewImage?: string
  previewImageFile?: File
  image: string
  tag: {
    text: string
    textAlign: 'left-4' | 'right-4'
    bgColor: string
  }
  description: {
    text: string
    textAlign: 'text-left' | 'text-right'
  }
}

export type SectionItem =
  | TextSection
  | DividerSection
  | ButtonSection
  | LogoWallSection
  | ImageSingleSection
  | ImageDoubleSection
  | ImageRectangleSection

export interface EditDetail {
  id: string
  link: string
  showQRCodeBtn: boolean
  showShareBtn: boolean
  profile: {
    title: string
    description: string
    avatar: string
    previewImage?: string
    previewImageFile?: File
  }
  section: SectionItem[]
  bgColor: string
  themeColor: string
}

export interface EditModalParams {
  title: string
  type: string
  idx: number
}

// 增加區塊按鈕
export type BlockType =
  | 'TEXT'
  | 'DIVIDER'
  | 'BUTTON'
  | 'LOGO_WALL'
  | 'IMAGE_SINGLE'
  | 'IMAGE_DOUBLE'
  | 'IMAGE_RECTANGLE'

export type AddBlockButton = {
  type: BlockType
  icon: string
  text: string
  toolTip: string
}
