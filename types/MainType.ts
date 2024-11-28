// 共同基礎類型
interface BaseSection {
  type: string
  isShow?: boolean
}

interface TextSection extends BaseSection {
  type: 'TEXT'
  id: string
  text: string
  style?: {
    fontSize?: string
    fontWeight?: string
    textDecoration?: string
    fontStyle?: string
    textAlign?: 'left' | 'center' | 'right'
    color?: string
  }
}

interface ImageSection extends BaseSection {
  type: 'IMAGE'
  id: string
  src: string
  alt?: string
}

interface ButtonSection extends BaseSection {
  type: 'BUTTON'
  id: string
  label: string
  link: string
  style?: {
    backgroundColor?: string
    color?: string
    borderRadius?: string
  }
}

export type SectionItem = TextSection | ImageSection | ButtonSection

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
  | 'SQUARE_SINGLE'
  | 'SQUARE_DOUBLE'
  | 'RECTANGLE'
  | 'BUTTON'
  | 'LOGO_WALL'

export type AddBlockButton = {
  type: AddBlockButtonType
  icon: string
  text: string
  toolTip: string
}
