// 共同基礎類型
interface BaseSection {
  type: string
  isShow: boolean
}

interface TextSection extends BaseSection {
  type: 'TEXT'
  id: string
  text: string
  style?: {
    fontSize?: 'text-base' | 'text-xl' | 'text-3xl' | 'text-4xl'
    isBold?: boolean
    isUnderline?: boolean
    isItalic?: boolean
    textAlign?: 'text-left' | 'text-center' | 'text-right'
    color?: string
  }
}

interface DividerSection extends BaseSection {
  type: 'DIVIDER'
  id: string
  style?: {
    type?: 'border-solid' | 'border-dashed' | 'border-dotted' | 'border-double'
    width?: 'border-b' | 'border-b-2' | 'border-b-4' | 'border-b-8'
    color?: string
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
  style?: {
    fontSize?: 'text-base' | 'text-xl' | 'text-3xl' | 'text-4xl'
  }
}

interface LogoWallSection extends BaseSection {
  type: 'LOGO_WALL'
  id: string
  logoList: Array<{
    id: string
    icon: string
    link: string
    toolTip: string
  }>
}

interface ImageSingleSection extends BaseSection {
  type: 'IMAGE_SINGLE'
  id: string
  url: string
  previewImage?: string
  previewImageFile?: File
}

export type SectionItem =
  | TextSection
  | DividerSection
  | ButtonSection
  | LogoWallSection
  | ImageSingleSection

export interface EditDetail {
  id: string
  link: string
  showQRCodeBtn: boolean
  showShareBtn: boolean
  profile: {
    title: string
    description: string
    avatar: string
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
export type AddBlockButtonType =
  | 'TEXT'
  | 'DIVIDER'
  | 'BUTTON'
  | 'IMAGE_SINGLE'
  | 'IMAGE_DOUBLE'
  | 'IMAGE_RECTANGLE'
  | 'LOGO_WALL'

export type AddBlockButton = {
  type: AddBlockButtonType
  icon: string
  text: string
  toolTip: string
}
