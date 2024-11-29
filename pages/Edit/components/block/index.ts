import TEXT from './TextBlock.vue'
import DIVIDER from './DividerBlock.vue'
import BUTTON from './ButtonBlock.vue'

export const BlockTypeComponent: Record<string, typeof TEXT> = {
  TEXT,
  DIVIDER,
  BUTTON,
}
