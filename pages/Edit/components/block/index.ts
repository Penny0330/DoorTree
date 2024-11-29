import TEXT from './TextBlock.vue'
import DIVIDER from './DividerBlock.vue'

export const BlockTypeComponent: Record<string, typeof TEXT> = {
  TEXT,
  DIVIDER,
}
