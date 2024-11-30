import Profile from './ProfileSetting.vue'
import TEXT from './TextSetting.vue'
import DIVIDER from './DividerSetting.vue'
import BUTTON from './ButtonSetting.vue'
import LOGO_WALL from './LogoWallSetting.vue'
import IMAGE_SINGLE from './ImageSingleSetting.vue'

export const settingTypeComponent: Record<
  string,
  | typeof TEXT
  | typeof DIVIDER
  | typeof BUTTON
  | typeof LOGO_WALL
  | typeof IMAGE_SINGLE
> = {
  Profile,
  TEXT,
  DIVIDER,
  BUTTON,
  LOGO_WALL,
  IMAGE_SINGLE,
}
