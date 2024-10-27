<script setup lang="ts">
import { CircleX, Info, CircleCheck } from 'lucide-vue-next'

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
    icon: CircleCheck,
  },
  error: {
    bgColor: 'bg-red-500',
    icon: CircleX,
  },
  info: {
    bgColor: 'bg-blue-500',
    icon: Info,
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
