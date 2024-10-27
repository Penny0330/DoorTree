<script setup lang="ts">
import GlobalToast from '~/components/GlobalToast.vue'
import { useGlobalToast } from '~/composables/useGlobalToast'

const { showToast, toastMessage, toastType, toastTime, showGlobalToast } =
  useGlobalToast()

provide('showGlobalToast', showGlobalToast)
</script>

<template>
  <div>
    <NuxtLayout>
      <GlobalToast
        v-if="showToast"
        :message="toastMessage"
        :type="toastType"
        :time="toastTime"
      />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped></style>
