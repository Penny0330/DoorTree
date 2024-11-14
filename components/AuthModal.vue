<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const {
  email,
  password,
  isLoading,
  handleLogin,
  handleSignup,
  handleLoginUseGoogle,
} = useAuth()

const props = defineProps({
  // showAuthModal: {
  //   type: Boolean,
  //   default: false,
  // },
  isLoginAction: {
    type: Boolean,
    default: true,
  },
  onToggleAuthModal: {
    type: Function,
    default: () => {
      console.warn('onToggleAuthModal not provided')
    },
  },
  onToggleAuthAction: {
    type: Function,
    default: () => {
      console.warn('onToggleAuthAction not provided')
    },
  },
})

const toggleTitle = computed(() => {
  return props.isLoginAction ? 'Login' : 'Sign up'
})

const toggleGoogleButtonText = computed(() => {
  return props.isLoginAction ? 'Continue with Google' : 'Sign up with Google'
})

const toggleButtonText = computed(() => {
  return props.isLoginAction
    ? "Don't have an account? Sign up"
    : 'Already have an account? Login'
})

const onToggleAuthAction = (_event: MouseEvent) => {
  props.onToggleAuthAction()
}

const onToggleAuthModal = (_event: MouseEvent) => {
  props.onToggleAuthModal()
}

const onOverlayClick = (_event: MouseEvent) => {
  if (_event.target === _event.currentTarget) {
    props.onToggleAuthModal()
  }
}

const onSubmit = () => {
  if (props.isLoginAction) {
    handleLogin()
  } else {
    handleSignup()
  }
}
</script>

<template>
  <div class="w-full h-dvh fixed z-30 bg-main-overlay" @click="onOverlayClick">
    <div
      class="w-4/5 bg-white rounded-2xl m-auto mt-10 py-4 px-5 relative max-w-md"
      @click.stop
    >
      <header class="text-xl text-center my-4">
        {{ toggleTitle }}
      </header>
      <Icon
        name="iconamoon:close"
        class="absolute top-3 right-4 text-2xl text-gray-400 cursor-pointer"
        @click="onToggleAuthModal"
      />
      <section>
        <form action="">
          <div class="flex flex-col mb-4">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              name="email"
              placeholder="Please enter your email"
              :disabled="isLoading"
            />
          </div>
          <div class="flex flex-col">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              name="password"
              placeholder="Please enter your password"
              :disabled="isLoading"
            />
          </div>
        </form>
        <button
          class="btn-primary mt-10 mb-2 w-full"
          :disabled="isLoading"
          @click="onSubmit"
        >
          <Icon
            v-if="isLoading"
            name="eos-icons:loading"
            class="text-2xl m-auto align-middle"
          />
          <p v-else>{{ toggleTitle }}</p>
        </button>
        <div class="flex items-center justify-center">
          <span class="border-b flex-1"></span>
          <span class="mx-4 text-gray-400">or</span>
          <span class="border-b flex-1"></span>
        </div>
        <button
          class="btn-default mt-2 mb-8 flex justify-center items-center gap-4 w-full"
          :disabled="isLoading"
          @click="handleLoginUseGoogle"
        >
          <Icon name="logos:google-icon" class="text-xl" />
          {{ toggleGoogleButtonText }}
        </button>
        <div class="my-2 text-center flex flex-col">
          <button
            v-if="isLoginAction"
            class="text-sm underline text-slate-500 mb-2"
          >
            Forgot password?
          </button>
          <button
            class="text-sm underline text-slate-500"
            @click="onToggleAuthAction"
          >
            {{ toggleButtonText }}
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
label {
  @apply text-sm text-slate-500 mb-1.5;
}
input {
  @apply text-sm border py-2 px-4 rounded focus-visible:outline-none focus:border-gray-500;
}
</style>
