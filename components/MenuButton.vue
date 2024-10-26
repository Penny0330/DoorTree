<script setup lang="ts">
import MenuIcon from '@/assets/icon/menu.svg'
import CloseIcon from '@/assets/icon/close.svg'

const props = defineProps({
  showMenu: {
    type: Boolean,
    default: false,
  },
  onToggleMenu: {
    type: Function,
    default: () => {
      console.warn('onToggleMenu not provided')
    },
  },
})

const onToggleMenu = (_event: MouseEvent) => {
  props.onToggleMenu()
}
</script>

<template>
  <div
    class="bg-main-red w-16 flex justify-center items-center rounded-bl-3xl"
    @click="onToggleMenu"
  >
    <img :src="props.showMenu ? CloseIcon : MenuIcon" alt="MENU" />
  </div>
</template>

<style scoped></style>
