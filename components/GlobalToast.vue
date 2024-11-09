<script setup lang="ts">
import { Icon } from '#components'

const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String as () => 'success' | 'error' | 'info',
    default: 'info',
  },
})

const transformType = {
  success: {
    bgColor: 'bg-green-500',
    icon: () => h(Icon, { name: 'lets-icons:check-ring' }),
  },
  error: {
    bgColor: 'bg-red-500',
    icon: () => h(Icon, { name: 'ix:error' }),
  },
  info: {
    bgColor: 'bg-blue-500',
    icon: () => h(Icon, { name: 'bx:error-circle' }),
  },
}
</script>

<template>
  <div
    class="fixed z-40 transform -translate-x-1/2 top-[30px] left-1/2 text-white py-2 px-4 rounded shadow-md w-max flex gap-2 items-center"
    :class="transformType[props.type].bgColor"
  >
    <component :is="transformType[props.type].icon" class="w-5 h-5" />
    <span>{{ props.message }}</span>
  </div>
</template>
