<script setup lang="ts">
const props = defineProps({
  showQRCodeModal: {
    type: Boolean,
    default: false,
  },
  qrCodeImage: {
    type: String,
    default: '',
  },
  pathUrl: {
    type: String,
    default: '',
  },
})

defineEmits(['onToggleQRCodeModal'])
</script>

<template>
  <LazyCommonDialog
    :show-dialog="showQRCodeModal"
    :dialog-title="'QRCode'"
    :sub-title="'Here is your unique DoorTree QR code that will direct people to your DoorTree when scanned.'"
    :mask-closeable="true"
    @on-close-dialog="$emit('onToggleQRCodeModal')"
  >
    <template #modal-body>
      <div class="flex flex-col justify-center items-center">
        <img :src="qrCodeImage" alt="QRCode" class="w-40" />
        <a
          class="mt-4 text-gray-400 hover:underline"
          :href="pathUrl"
          target="_blank"
          >{{ pathUrl }}</a
        >
      </div>
    </template>
  </LazyCommonDialog>
</template>
