import type { SectionItem } from '@/types/MainType'
import { sectionCreators } from '@/pages/Edit/modal/index'

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
export function createNewSection(
  type: 'TEXT' | 'DIVIDER' | 'BUTTON' | 'LOGO_WALL',
): SectionItem {
  const createSection = sectionCreators[type]
  if (!createSection) {
    throw new Error(`Invalid block type: ${type}`)
  }
  return createSection()
}

export const themeColorOptions = [
  { value: 'default', label: 'bg-main-blue' },
  { value: 'red', label: 'bg-red-400' },
  { value: 'orange', label: 'bg-orange-400' },
  { value: 'amber', label: 'bg-amber-400' },
  { value: 'green', label: 'bg-green-400' },
  { value: 'sky', label: 'bg-sky-400' },
  { value: 'gray', label: 'bg-gray-400' },
  { value: 'black', label: 'bg-black' },
]

export const bgColorOptions = [
  { value: 'white', label: 'bg-white' },
  { value: 'red', label: 'bg-red-300' },
  { value: 'orange', label: 'bg-orange-300' },
  { value: 'amber', label: 'bg-amber-300' },
  { value: 'green', label: 'bg-green-300' },
  { value: 'sky', label: 'bg-sky-300' },
  { value: 'gray', label: 'bg-gray-300' },
]

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

export const transferBgClass = (
  type: 'text' | 'bg' | 'border',
  color: string,
) => {
  const classMap = {
    bg: {
      white: 'bg-white',
      red: 'bg-red-100',
      orange: 'bg-orange-100',
      amber: 'bg-amber-100',
      green: 'bg-green-100',
      sky: 'bg-sky-100',
      gray: 'bg-gray-100',
    },
  }

  return classMap[type][color] || ''
}

export const transferThemeClass = (
  type: 'text' | 'bg' | 'border',
  color: string,
) => {
  const classMap = {
    text: {
      default: 'text-main-blue',
      red: 'text-red-300',
      orange: 'text-orange-300',
      amber: 'text-amber-300',
      green: 'text-green-300',
      sky: 'text-sky-300',
      gray: 'text-gray-300',
      black: 'text-black',
    },
    bg: {
      default: 'bg-main-blue',
      red: 'bg-red-300',
      orange: 'bg-orange-300',
      amber: 'bg-amber-300',
      green: 'bg-green-300',
      sky: 'bg-sky-300',
      gray: 'bg-gray-300',
      black: 'bg-black',
    },
    border: {
      default: 'border-main-blue',
      red: 'border-red-300',
      orange: 'border-orange-300',
      amber: 'border-amber-300',
      green: 'border-green-300',
      sky: 'border-sky-300',
      gray: 'border-gray-300',
      black: 'border-black',
    },
  }

  return classMap[type][color] || ''
}

export const iconOptions = [
  {
    icon: 'majesticons:mail-line',
    toolTip: 'E-mail',
  },
  {
    icon: 'ic:baseline-facebook',
    toolTip: 'Facebook',
  },
  {
    icon: 'lets-icons:insta',
    toolTip: 'Instagram',
  },
  {
    icon: 'ant-design:global-outlined',
    toolTip: 'Website',
  },
  {
    icon: 'mingcute:youtube-fill',
    toolTip: 'Youtube',
  },
  {
    icon: 'ic:baseline-tiktok',
    toolTip: 'Tiktok',
  },
  {
    icon: 'proicons:x-twitter',
    toolTip: 'Twitter',
  },
  {
    icon: 'mingcute:threads-line',
    toolTip: 'Threads',
  },
  {
    icon: 'ic:baseline-discord',
    toolTip: 'Discord',
  },
  {
    icon: 'simple-icons:line',
    toolTip: 'Line',
  },
  {
    icon: 'ic:baseline-whatsapp',
    toolTip: 'Whatsapp',
  },
  {
    icon: 'bxl:telegram',
    toolTip: 'Telegram',
  },
  {
    icon: 'la:medium',
    toolTip: 'Medium',
  },
  {
    icon: 'mdi:github',
    toolTip: 'Github',
  },
  {
    icon: 'mdi:linkedin',
    toolTip: 'Linkedin',
  },
  {
    icon: 'mage:notion',
    toolTip: 'Notion',
  },
  {
    icon: 'hugeicons:figma',
    toolTip: 'Figma',
  },
  {
    icon: 'mdi:spotify',
    toolTip: 'Spotify',
  },
  {
    icon: 'mdi:podcast',
    toolTip: 'Podcast',
  },
  {
    icon: 'ri:amazon-fill',
    toolTip: 'Amazon',
  },
  {
    icon: 'simple-icons:shopee',
    toolTip: 'Shopee',
  },
  {
    icon: 'simple-icons:appstore',
    toolTip: 'App Store',
  },
  {
    icon: 'mage:playstore',
    toolTip: 'Play Store',
  },
  {
    icon: 'mdi:twitch',
    toolTip: 'Twitch',
  },
]
