<script setup lang="ts">
import lottie from 'lottie-web'
import type { AnimationItem } from 'lottie-web'

const props = defineProps({
  error: {
    type: Object,
    default: () => ({ statusCode: 500 }),
  },
})

const { error } = props
const lottieContainer = ref(null)
let lottieInstance: AnimationItem | null = null
const lottiePaths: Record<number, string> = {
  404: 'https://lottie.host/5ca2899b-2dba-4967-a077-7b5e7a01d469/30emq2HEix.json',
  500: 'https://lottie.host/913c8f2c-6985-4ff7-8e10-13b79dde5271/RZO8I4U2g9.json',
}

onMounted(() => {
  if (lottieContainer.value) {
    lottieInstance = lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: lottiePaths[error.statusCode as number] || lottiePaths[500],
    })
  }
})

onBeforeUnmount(() => {
  if (lottieInstance) {
    lottieInstance.destroy()
    lottieInstance = null
  }
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-between pt-24 h-dvh bg-orange-200"
  >
    <div class="flex flex-col items-center">
      <div ref="lottieContainer" class="w-[350px]"></div>
      <nuxt-link to="/" class="btn btn-hollow bg-white">回到首頁</nuxt-link>
    </div>
    <LayoutHomeFooter />
  </div>
</template>
