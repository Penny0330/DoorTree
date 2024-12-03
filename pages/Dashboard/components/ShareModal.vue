<script setup lang="ts">
import CommonDialog from '@/components/CommonDialog.vue'
import { useShowGlobalToast } from '@/composables/useGlobalToast'

const showGlobalToast = useShowGlobalToast()

const props = defineProps({
  showShareModal: {
    type: Boolean,
    default: false,
  },
  currentShareLink: {
    type: String,
    default: '',
  },
})

defineEmits(['onToggleShareModal'])

const shareLink = computed(
  () => `${window.location.origin}/${props.currentShareLink}`,
)

const onCopyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareLink.value)
    showGlobalToast({ message: 'Copied!', type: 'success' })
  } catch (err) {
    showGlobalToast({ message: 'Failed to copy!', type: 'success' })
    console.error('Failed to copy text: ', err)
  }
}
</script>

<template>
  <CommonDialog
    :show-dialog="showShareModal"
    :dialog-title="'Share your DoorTree'"
    :sub-title="'Get more visitors by sharing your DoorTree everywhere.'"
    :mask-closeable="true"
    @on-close-dialog="$emit('onToggleShareModal')"
  >
    <template #modal-body>
      <div class="flex justify-center">
        <button
          class="w-11/12 py-2 px-4 rounded-lg bg-gray-200 text-start"
          @click="onCopyLink"
        >
          {{ shareLink }}
        </button>
      </div>
    </template>
    <template #modal-footer>
      <a class="btn-default cursor-pointer" :href="shareLink" target="_blank"
        >Open Link</a
      >
      <button class="btn-primary flex" @click="onCopyLink">Copy</button>
    </template>
  </CommonDialog>
</template>
