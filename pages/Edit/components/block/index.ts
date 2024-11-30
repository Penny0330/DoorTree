import TEXT from './TextBlock.vue'
import DIVIDER from './DividerBlock.vue'
import BUTTON from './ButtonBlock.vue'
import LOGO_WALL from './LogoWallBlock.vue'

export const BlockTypeComponent: Record<string, typeof TEXT> = {
  TEXT,
  DIVIDER,
  BUTTON,
  LOGO_WALL,
}
