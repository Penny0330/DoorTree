<script setup lang="ts">
import Home from './components/home.vue'
import CreateStep from './components/homeCreateStep.vue'
import Feature from './components/homeFeature.vue'
import Feedback from './components/homeFeedback.vue'
</script>

<template>
  <div class="h-full pt-24 sm:pt-32 sm:flex sm:justify-center">
    <main
      class="bg-white ml-4 rounded-tl-3xl rounded-bl-3xl relative overflow-x-hidden overflow-y-auto h-dvh lg:max-w-[1440px]"
    >
      <img
        src="../assets/icon/bg-home.svg"
        alt="BG-HOME"
        class="absolute right-0 top-[-23px]"
      />
      <Home />
      <div class="divider"></div>
      <CreateStep />
      <div class="divider"></div>
      <Feature />
      <Feedback />
    </main>
  </div>
</template>

<style scoped>
.divider {
  @apply border-b-4 border-double mx-8;
}
</style>
