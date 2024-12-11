<script setup lang="ts">
import { useGlobalToast } from '@/composables/useGlobalToast'
import { useConfirmModal } from '@/composables/useConfirmModal'

const { showToast, toastMessage, toastType, toastTime, showGlobalToast } =
  useGlobalToast()
const { showModal, confirmModalOptions, closeConfirmModal, showConfirmModal } =
  useConfirmModal()

provide('showGlobalToast', showGlobalToast)
provide('showConfirmModal', showConfirmModal)
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
      <CommonConfirmModal
        v-if="showModal"
        :confirm-modal-options="confirmModalOptions"
        @close-confirm-modal="closeConfirmModal"
      />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped></style>
