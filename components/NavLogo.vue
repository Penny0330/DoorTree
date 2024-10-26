<script setup lang="ts">
import Logo from '@/assets/icon/logo.svg'

const props = defineProps({
  hasBoxShadow: {
    type: Boolean,
    default: true,
  },
  hasBorder: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div
    :class="[
      ' w-3/4 rounded-full py-2 px-4 flex justify-between items-center bg-white mt-4 ml-4',
      { 'shadow-md': props.hasBoxShadow, border: props.hasBorder },
    ]"
  >
    <div class="flex items-center gap-x-2">
      <img :src="Logo" alt="LOGO" class="w-8" />
      <span class="text-base font-semibold">DoorTree</span>
    </div>
  </div>
</template>

<style scoped></style>
