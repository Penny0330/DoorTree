<script setup lang="ts">
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
    class="bg-main-blue w-16 flex justify-center items-center rounded-bl-3xl sm:hidden"
    @click="onToggleMenu"
  >
    <component
      :is="'Icon'"
      :name="props.showMenu ? 'iconamoon:close' : 'gg:menu-right-alt'"
      class="text-white text-[28px]"
    ></component>
  </div>
</template>

<style scoped></style>
