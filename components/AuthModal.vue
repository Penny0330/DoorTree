<script setup lang="ts">
import CloseGrayIcon from '@/assets/icon/close-gray.svg'
import GoogleIcon from '@/assets/icon/google.png'

const store = useStore()

const props = defineProps({
  showAuthModal: {
    type: Boolean,
    default: false,
  },
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

const email = ref<string | null>(null)
const password = ref<any>(null)

const onSubmit = () => {
  if (props.isLoginAction) {
    store.onLogin(email.value, password.value)
  } else {
    store.onSignup(email.value, password.value)
  }
}
</script>

<template>
  <div class="w-full h-dvh fixed z-30 bg-main-overlay" @click="onOverlayClick">
    <div
      class="w-4/5 bg-white rounded-2xl m-auto mt-10 py-4 px-5 relative"
      @click.stop
    >
      <header class="text-xl text-center my-4">
        {{ toggleTitle }}
      </header>
      <img
        :src="CloseGrayIcon"
        alt="CLOSE-BUTTON"
        class="absolute top-3 right-4"
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
            />
          </div>
        </form>
        <button
          class="btn btn-solid btn-bg-main-blue mt-10 mb-2"
          @click="onSubmit"
        >
          {{ toggleTitle }}
        </button>
        <div class="flex items-center justify-center">
          <span class="border-b flex-1"></span>
          <span class="mx-4 text-gray-400">or</span>
          <span class="border-b flex-1"></span>
        </div>
        <button
          class="btn btn-hollow btn-outline-default mt-2 mb-8 flex justify-center items-center gap-4"
          @click="store.onLoginUseGoogle"
        >
          <img :src="GoogleIcon" alt="Google-Icon" class="w-6" />
          {{ toggleGoogleButtonText }}
        </button>
        <div class="my-2 text-center">
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

<style scoped></style>
