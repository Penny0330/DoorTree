<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { handleLogout } = useAuth()
const store = useStore()

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
  onToggleAuthModal: {
    type: Function,
    default: () => {
      console.warn('onToggleAuthModal not provided')
    },
  },
})

const onToggleMenu = (_event: MouseEvent) => {
  props.onToggleMenu()
}

const onToggleAuthModal = (_event: MouseEvent) => {
  props.onToggleAuthModal()
}

const onLogout = (_event: MouseEvent) => {
  handleLogout()
  props.onToggleMenu()
}

const isLogin = computed(() => store.isLogin)
</script>

<template>
  <div class="bg-white h-dvh w-full fixed z-20">
    <nav class="flex justify-between w-full">
      <NavLogo :has-box-shadow="false" :has-border="false" />
      <MenuButton :show-menu="props.showMenu" :on-toggle-menu="onToggleMenu" />
    </nav>
    <section>
      <ul class="p-10">
        <li>
          <template v-if="isLogin">
            <nuxt-link
              to="/Dashboard"
              class="a-btn btn-link"
              active-class="text-main-blue font-bold"
              @click="onToggleMenu"
            >
              Dashboard
            </nuxt-link>
            <a href="/" class="a-btn btn-link" @click.prevent="onLogout"
              >Logout</a
            >
          </template>
          <template v-else>
            <a
              href="/"
              class="a-btn btn-link"
              @click.prevent="onToggleAuthModal"
              >Login</a
            >
          </template>
        </li>
        <li v-if="!isLogin">
          <a href="/" class="a-btn btn-link">Feature</a>
        </li>
        <li v-if="!isLogin">
          <a href="/" class="a-btn btn-link">Templates</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.a-btn {
  @apply w-full h-auto py-4 pr-4 pl-0;
}
</style>
