<script setup lang="ts">
import { useShowGlobalToast } from '@/composables/useGlobalToast'

const showGlobalToast = useShowGlobalToast()

const props = defineProps({
  link: {
    type: String,
    default: '',
  },
})

const shareLink = ref<string>(`${window.location.origin}/${props.link}`)

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
  <div
    class="shadow-around-light flex items-center justify-between px-4 py-3 rounded-lg bg-white"
  >
    <span
      class="text-zinc-500 text-nowrap overflow-x-auto overscroll-none hide-scrollbar mr-4"
    >
      {{ shareLink }}
    </span>

    <div class="flex gap-2">
      <button
        class="p-[3.5px] rounded-lg bg-white border-[2.5px] border-main-blue h-fit flex items-center justify-center"
        @click="onCopyLink"
      >
        <Icon name="tabler:copy" class="text-main-blue text-xl" />
      </button>
      <a
        :href="`/${link}`"
        target="_blank"
        class="p-1.5 rounded-lg bg-main-blue h-fit flex items-center justify-center"
      >
        <Icon name="mi:external-link" class="text-white text-xl" />
      </a>
    </div>
  </div>
</template>
