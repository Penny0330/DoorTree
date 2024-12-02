import TEXT from './TextBlock.vue'
import DIVIDER from './DividerBlock.vue'
import BUTTON from './ButtonBlock.vue'
import LOGO_WALL from './LogoWallBlock.vue'
import IMAGE_SINGLE from './ImageSingleBlock.vue'
import IMAGE_DOUBLE from './ImageDoubleBlock.vue'
import IMAGE_RECTANGLE from './ImageRectangleBlock.vue'

export const BlockTypeComponent: Record<
  string,
  | typeof TEXT
  | typeof DIVIDER
  | typeof BUTTON
  | typeof LOGO_WALL
  | typeof IMAGE_SINGLE
  | typeof IMAGE_DOUBLE
  | typeof IMAGE_RECTANGLE
> = {
  TEXT,
  DIVIDER,
  BUTTON,
  LOGO_WALL,
  IMAGE_SINGLE,
  IMAGE_DOUBLE,
  IMAGE_RECTANGLE,
}
