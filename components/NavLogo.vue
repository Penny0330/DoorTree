<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { handleLogout } = useAuth()
const store = useStore()

const props = defineProps({
  hasBoxShadow: {
    type: Boolean,
    default: true,
  },
  hasBorder: {
    type: Boolean,
    default: true,
  },
  onToggleMenu: {
    type: Function,
    default: () => {
      console.warn('onToggleMenu not provided')
    },
  },
  onToggleAuthModal: {
    type: Function,
    default: () => {
      console.warn('onToggleAuthModal not provided')
    },
  },
})

const onToggleAuthModal = (_event: MouseEvent) => {
  props.onToggleAuthModal()
}

const onLogout = (_event: MouseEvent) => {
  handleLogout()
}

const isLogin = computed(() => store.isLogin)
</script>

<template>
  <div
    :class="[
      ' w-3/4 rounded-full py-2 px-4 flex justify-between items-center bg-white mt-4 ml-4 sm:py-6 sm:px-10 sm:m-auto sm:w-11/12 max-w-[1440px]',
      { 'shadow-md': props.hasBoxShadow, border: props.hasBorder },
    ]"
  >
    <div class="w-full flex justify-between">
      <div class="flex items-center gap-x-2">
        <Icon
          name="lucide:door-open"
          class="text-main-blue text-2xl sm:text-[28px]"
        />
        <a href="/" class="text-base font-semibold text-main-blue sm:text-xl"
          >DoorTree</a
        >
      </div>
      <div class="hidden sm:flex sm:gap-4 text-gray-500 font-semibold">
        <template v-if="!isLogin">
          <a
            href="/"
            class="hover:text-main-blue px-2 transition ease-in-out delay-80 cursor-pointer"
            >Feature</a
          >
          <a
            href="/"
            class="hover:text-main-blue px-2 transition ease-in-out delay-80 cursor-pointer"
            >Templates</a
          >
          <a
            class="hover:text-main-blue px-2 transition ease-in-out delay-80 cursor-pointer"
            @click="onToggleAuthModal"
            >Login</a
          >
        </template>
        <template v-else>
          <a
            href="/Dashboard"
            class="hover:text-main-blue px-2 transition ease-in-out delay-80 cursor-pointer"
            >Dashboard</a
          >
          <a
            href="/"
            class="hover:text-main-blue px-2 transition ease-in-out delay-80 cursor-pointer"
            @click="onLogout"
            >Logout</a
          >
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
