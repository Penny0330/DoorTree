<script setup lang="ts">
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
      <LazyGlobalToast
        v-if="showToast"
        :message="toastMessage"
        :type="toastType"
        :time="toastTime"
      />
      <LazyCommonConfirmModal
        v-if="showModal"
        :confirm-modal-options="confirmModalOptions"
        @close-confirm-modal="closeConfirmModal"
      />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped></style>
