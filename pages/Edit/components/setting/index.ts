import Profile from './ProfileSetting.vue'
import TEXT from './TextSetting.vue'
import DIVIDER from './DividerSetting.vue'
import BUTTON from './ButtonSetting.vue'
import LOGO_WALL from './LogoWallSetting.vue'

export const settingTypeComponent: Record<
  string,
  typeof Profile | typeof TEXT
> = {
  Profile,
  TEXT,
  DIVIDER,
  BUTTON,
  LOGO_WALL,
}
