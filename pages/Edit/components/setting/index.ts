import Profile from './ProfileSetting.vue'
import TEXT from './TextSetting.vue'

export const settingTypeComponent: Record<
  string,
  typeof Profile | typeof TEXT
> = {
  Profile,
  TEXT,
}
