import type { Component } from 'vue'
import Profile from './ProfileSetting.vue'
import TEXT from './TextSetting.vue'
import DIVIDER from './DividerSetting.vue'
import BUTTON from './ButtonSetting.vue'
import LOGO_WALL from './LogoWallSetting.vue'
import IMAGE_SINGLE from './ImageSingleSetting.vue'
import IMAGE_DOUBLE from './ImageDoubleSetting.vue'
import IMAGE_RECTANGLE from './ImageRectangleSetting.vue'
import type { BlockType } from '@/types/MainType'

export const settingTypeComponent: Record<BlockType | 'Profile', Component> = {
  Profile,
  TEXT,
  DIVIDER,
  BUTTON,
  LOGO_WALL,
  IMAGE_SINGLE,
  IMAGE_DOUBLE,
  IMAGE_RECTANGLE,
}
