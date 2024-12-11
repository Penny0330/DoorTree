import TEXT from './Text.vue'
import DIVIDER from './Divider.vue'
import BUTTON from './Button.vue'
import LOGO_WALL from './LogoWall.vue'
import IMAGE_SINGLE from './ImageSingle.vue'
import IMAGE_DOUBLE from './ImageDouble.vue'
import IMAGE_RECTANGLE from './ImageRectangle.vue'

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
