<script setup lang="ts">
const store = useStore()

// side menu
const showMenu = ref<boolean>(false)
const onToggleMenu = () => {
  showMenu.value = !showMenu.value
}

// login or signUp modal
const showAuthModal = ref<boolean>(false)
const isLoginAction = ref<boolean>(true)
const onToggleAuthModal = () => {
  showAuthModal.value = !showAuthModal.value
}
const onToggleAuthAction = () => {
  isLoginAction.value = !isLoginAction.value
}

watch(
  [showMenu, showAuthModal, () => store.isLogin],
  ([newShowMenu, newShowAuthModal, newIsLogin]) => {
    // open sideMenu or authModal: body overflow hidden
    document.body.style.overflow =
      newShowMenu || newShowAuthModal ? 'hidden' : ''

    if (newShowAuthModal) {
      showMenu.value = false
      // authModal always opens in the login form
      if (!isLoginAction.value) {
        isLoginAction.value = true
      }
      // if login, not show authModal
      if (newIsLogin) {
        showAuthModal.value = false
      }
    }
  },
)
</script>

<template>
  <nav class="flex justify-between fixed z-10 w-full">
    <NavLogo :has-box-shadow="true" :has-border="true" />
    <MenuButton :show-menu="showMenu" :on-toggle-menu="onToggleMenu" />
  </nav>
  <transition name="fade">
    <SideMenu
      v-if="showMenu"
      :show-menu="showMenu"
      :show-auth-modal="showAuthModal"
      :on-toggle-menu="onToggleMenu"
      :on-toggle-auth-modal="onToggleAuthModal"
    />
  </transition>
  <transition name="fade">
    <AuthModal
      v-if="showAuthModal"
      :show-auth-modal="showAuthModal"
      :is-login-action="isLoginAction"
      :on-toggle-auth-modal="onToggleAuthModal"
      :on-toggle-auth-action="onToggleAuthAction"
    />
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
