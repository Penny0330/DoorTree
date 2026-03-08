// 共同基礎類型
interface BaseSection {
  type: string
  id: string
  isShow: boolean
}

interface ImageTag {
  text: string
  textAlign: 'left-4' | 'right-4'
  bgColor: string
}

interface ImageDescription {
  text: string
  textAlign: 'text-left' | 'text-right'
}

interface BaseImageSection extends BaseSection {
  link: string
  previewImage?: string
  previewImageFile?: File
  image: string
  tag: ImageTag
  description: ImageDescription
}

interface FontSizeStyle {
  fontSize: 'text-base' | 'text-xl' | 'text-3xl' | 'text-4xl'
}

interface TextSection extends BaseSection {
  type: 'TEXT'
  text: string
  style: FontSizeStyle & {
    isBold: boolean
    isUnderline: boolean
    isItalic: boolean
    textAlign: 'text-left' | 'text-center' | 'text-right'
    color: string
  }
}

interface DividerSection extends BaseSection {
  type: 'DIVIDER'
  style: {
    type: 'border-solid' | 'border-dashed' | 'border-dotted' | 'border-double'
    width: 'border-b' | 'border-b-2' | 'border-b-4' | 'border-b-8'
    color: string
  }
}

interface ButtonSection extends BaseSection {
  type: 'BUTTON'
  text: string
  link: string
  showDescription: boolean
  description: string
  isFill: boolean
  style: FontSizeStyle
}

interface LogoWallSection extends BaseSection {
  type: 'LOGO_WALL'
  logoList: Array<{
    id: string
    link: string
    type: string
    icon?: string
    toolTip?: string
    placeholder?: string
  }>
}

interface ImageSingleSection extends BaseImageSection {
  type: 'IMAGE_SINGLE'
}

interface ImageDoubleItem {
  id: string
  link: string
  previewImage?: string | null
  previewImageFile?: File | null
  image: string
  tag: ImageTag
  description: ImageDescription
}

export interface ImageDoubleSection extends BaseSection {
  type: 'IMAGE_DOUBLE'
  imageList: Array<ImageDoubleItem>
}

interface ImageRectangleSection extends BaseImageSection {
  type: 'IMAGE_RECTANGLE'
}

export type SectionItem =
  | TextSection
  | DividerSection
  | ButtonSection
  | LogoWallSection
  | ImageSingleSection
  | ImageDoubleSection
  | ImageRectangleSection

export type BlockType = SectionItem['type']

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

export type AddBlockButton = {
  type: BlockType
  icon: string
  text: string
  toolTip: string
}
