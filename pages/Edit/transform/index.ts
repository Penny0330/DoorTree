import type { SectionItem, BlockType } from '@/types/MainType'
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

export function createNewSection(type: BlockType): SectionItem {
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

export const tagTextAlignOptions = [
  { value: 'left-4', label: 'Left' },
  { value: 'right-4', label: 'Right' },
]

type ClassMap = {
  bg: Record<string, string>
  text?: Record<string, string>
  border?: Record<string, string>
}

export const transferBgClass = (
  type: 'text' | 'bg' | 'border',
  color: string,
) => {
  const classMap: ClassMap = {
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

  return classMap[type]?.[color] || ''
}

export const transferThemeClass = (
  type: 'text' | 'bg' | 'border',
  color: string,
) => {
  const classMap: ClassMap = {
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

  return classMap[type]?.[color] || ''
}

export const transLogoList = (logoList: any[]): any[] => {
  return logoList.map((element) => {
    const matchedIcon = iconOptions.find((icon) => icon.type === element.type)

    return {
      ...element,
      ...matchedIcon,
    }
  })
}

export const transformSection = (section: any[]) => {
  return section.map((item) => {
    if (item.type === 'LOGO_WALL') {
      return {
        ...item,
        logoList: transLogoList(item.logoList),
      }
    }
    return item
  })
}

function stripConvertedData(logoList: any[]): any[] {
  // 保留要的參數
  return logoList.map(({ id, type, link }) => ({
    id,
    type,
    link,
  }))
}

export function transferSaveData(section: any[]): any[] {
  return section.map((item) => {
    if (item.type === 'LOGO_WALL') {
      return {
        ...item,
        logoList: stripConvertedData(item.logoList),
      }
    }
    return item
  })
}

export const iconOptions = [
  {
    type: 'E-mail',
    icon: 'majesticons:mail-line',
    toolTip: 'E-mail',
    placeholder: 'xxx@gmail.com',
  },
  {
    type: 'Facebook',
    icon: 'ic:baseline-facebook',
    toolTip: 'Facebook',
    placeholder: 'https://www.facebook.com/xxx',
  },
  {
    type: 'Instagram',
    icon: 'lets-icons:insta',
    toolTip: 'Instagram',
    placeholder: 'https://www.instagram.com/xxx',
  },
  {
    type: 'Website',
    icon: 'ant-design:global-outlined',
    toolTip: 'Website',
    placeholder: 'https://www...',
  },
  {
    type: 'Youtube',
    icon: 'mingcute:youtube-fill',
    toolTip: 'Youtube',
    placeholder: 'https://www.youtube.com/xxx',
  },
  {
    type: 'Tiktok',
    icon: 'ic:baseline-tiktok',
    toolTip: 'Tiktok',
    placeholder: 'https://www.tiktok.com/@xxx',
  },
  {
    type: 'Twitter',
    icon: 'proicons:x-twitter',
    toolTip: 'Twitter',
    placeholder: 'https://www.twitter.com/xxx',
  },
  {
    type: 'Threads',
    icon: 'mingcute:threads-line',
    toolTip: 'Threads',
    placeholder: 'https://www.threads.net/xxx',
  },
  {
    type: 'Discord',
    icon: 'ic:baseline-discord',
    toolTip: 'Discord',
    placeholder: 'https://www.discord.gg/xxx',
  },
  {
    type: 'Line',
    icon: 'simple-icons:line',
    toolTip: 'Line',
    placeholder: 'https://line.me/ti/p/xxx',
  },
  {
    type: 'Whatsapp',
    icon: 'ic:baseline-whatsapp',
    toolTip: 'Whatsapp',
    placeholder: 'https://wa.me/xxx',
  },
  {
    type: 'Telegram',
    icon: 'bxl:telegram',
    toolTip: 'Telegram',
    placeholder: 'https://t.me/xxx',
  },
  {
    type: 'Medium',
    icon: 'la:medium',
    toolTip: 'Medium',
    placeholder: 'https://medium.com/@xxx',
  },
  {
    type: 'Github',
    icon: 'mdi:github',
    toolTip: 'Github',
    placeholder: 'https://github.com/xxx',
  },
  {
    type: 'Linkedin',
    icon: 'mdi:linkedin',
    toolTip: 'Linkedin',
    placeholder: 'https://www.linkedin.com/in/xxx',
  },
  {
    type: 'Notion',
    icon: 'mage:notion',
    toolTip: 'Notion',
    placeholder: 'https://www.notion.so/xxx/...',
  },
  {
    type: 'Figma',
    icon: 'hugeicons:figma',
    toolTip: 'Figma',
    placeholder: 'https://www.figma.com/@xxx',
  },
  {
    type: 'Spotify',
    icon: 'mdi:spotify',
    toolTip: 'Spotify',
    placeholder: 'https://open.spotify.com/show/xxx',
  },
  {
    type: 'Podcast',
    icon: 'mdi:podcast',
    toolTip: 'Podcast',
    placeholder: 'https://podcast.apply.com/tw/podcast/xxx',
  },
  {
    type: 'Amazon',
    icon: 'ri:amazon-fill',
    toolTip: 'Amazon',
    placeholder: 'https://www.amazon.com/shops/xxx',
  },
  {
    type: 'Shopee',
    icon: 'simple-icons:shopee',
    toolTip: 'Shopee',
    placeholder: 'https://shopee.tw/xxx',
  },
  {
    type: 'App Store',
    icon: 'simple-icons:appstore',
    toolTip: 'App Store',
    placeholder: 'https://www...',
  },
  {
    type: 'Play Store',
    icon: 'mage:playstore',
    toolTip: 'Play Store',
    placeholder: 'https://www...',
  },
  {
    type: 'Twitch',
    icon: 'mdi:twitch',
    toolTip: 'Twitch',
    placeholder: 'https://www.twitch.tv/xxx',
  },
]
