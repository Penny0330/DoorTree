import type { CheckLinkTransform } from '~/types/DashboardType'
import { Icon } from '#components'

export const checkLinkTransformType: CheckLinkTransform = {
  loading: {
    icon: () => h(Icon, { name: 'eos-icons:loading', class: 'text-gray-500' }),
    text: '',
  },
  success: {
    icon: () =>
      h(Icon, { name: 'lets-icons:check-ring', class: 'text-green-500' }),
    text: '',
  },
  exist: {
    icon: () => h(Icon, { name: 'ix:error', class: 'text-red-500' }),
    text: 'That link is already taken',
  },
  error: {
    icon: () => h(Icon, { name: 'bx:error-circle', class: 'text-red-500' }),
    text: 'must be 3 characters or longer',
  },
  invalid: {
    icon: () => h(Icon, { name: 'bx:error-circle', class: 'text-red-500' }),
    text: 'only contain letters, numbers, underscores ("_") and periods (".")',
  },
}
