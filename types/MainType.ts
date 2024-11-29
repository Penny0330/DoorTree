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

// interface ImageSection extends BaseSection {
//   type: 'IMAGE'
//   id: string
//   src: string
//   alt?: string
// }

// interface ButtonSection extends BaseSection {
//   type: 'BUTTON'
//   id: string
//   label: string
//   link: string
//   style?: {
//     backgroundColor?: string
//     color?: string
//     borderRadius?: string
//   }
// }

export type SectionItem = TextSection | DividerSection

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
