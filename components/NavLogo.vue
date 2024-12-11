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

const scrollToSection = (sectionId: string) => {
  const targetElement = document.getElementById(sectionId)
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}
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
        <a
          href="/"
          class="text-base font-semibold font-mono text-main-blue sm:text-xl"
          >DoorTree</a
        >
      </div>
      <div class="hidden sm:flex sm:gap-4 text-gray-500 font-semibold">
        <template v-if="!isLogin">
          <a
            class="hover:text-main-blue px-2 hover-transition cursor-pointer"
            @click="scrollToSection('feature')"
            >Feature</a
          >
          <a
            class="hover:text-main-blue px-2 transition hover-transition cursor-pointer"
            @click="scrollToSection('feedback')"
            >Feedback</a
          >
          <a
            class="hover:text-main-blue px-2 transition hover-transition cursor-pointer"
            @click="onToggleAuthModal"
            >Login</a
          >
        </template>
        <template v-else>
          <nuxt-link
            to="/Dashboard"
            class="hover:text-main-blue px-2 hover-transition"
            active-class="text-main-blue font-bold"
          >
            Dashboard
          </nuxt-link>
          <a
            href="/"
            class="hover:text-main-blue px-2 hover-transition"
            @click="onLogout"
            >Logout</a
          >
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
