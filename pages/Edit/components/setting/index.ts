import Profile from './ProfileSetting.vue'
import TEXT from './TextSetting.vue'
import DIVIDER from './DividerSetting.vue'

export const settingTypeComponent: Record<
  string,
  typeof Profile | typeof TEXT
> = {
  Profile,
  TEXT,
  DIVIDER,
}
