import type { Component } from 'vue'
import TEXT from './Text.vue'
import DIVIDER from './Divider.vue'
import BUTTON from './Button.vue'
import LOGO_WALL from './LogoWall.vue'
import IMAGE_SINGLE from './ImageSingle.vue'
import IMAGE_DOUBLE from './ImageDouble.vue'
import IMAGE_RECTANGLE from './ImageRectangle.vue'
import type { BlockType } from '@/types/MainType'

export const BlockTypeComponent: Record<BlockType, Component> = {
  TEXT,
  DIVIDER,
  BUTTON,
  LOGO_WALL,
  IMAGE_SINGLE,
  IMAGE_DOUBLE,
  IMAGE_RECTANGLE,
}
