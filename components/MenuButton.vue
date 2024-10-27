<script setup lang="ts">
import { X } from 'lucide-vue-next'
import MenuIcon from '@/assets/icon/MenuIcon.vue'

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
    class="bg-main-blue w-16 flex justify-center items-center rounded-bl-3xl"
    @click="onToggleMenu"
  >
    <component
      :is="props.showMenu ? X : MenuIcon"
      class="stroke-white"
    ></component>
  </div>
</template>

<style scoped></style>
