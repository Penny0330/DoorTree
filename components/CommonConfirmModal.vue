<script setup lang="ts">
const props = defineProps({
  confirmModalOptions: {
    type: Object,
    default: () => {},
  },
})

const {
  modalTitle,
  content,
  customIcon,
  customIconColor,
  cancelBtnText,
  okBtnText,
  isDanger,
  confirmLoading,
  onOk,
} = props.confirmModalOptions

const emit = defineEmits(['closeConfirmModal'])
const isLoading = ref<boolean>(false) // if confirmLoading is true

const handleOk = async () => {
  if (confirmLoading) {
    isLoading.value = true
    try {
      await onOk?.()
    } finally {
      isLoading.value = false
    }
  } else {
    await onOk?.()
  }

  emit('closeConfirmModal')
}
</script>

<template>
  <div class="w-full h-dvh fixed top-0 z-30 bg-main-overlay">
    <div
      class="w-11/12 max-w-[416px] bg-white rounded-2xl m-auto mt-[50%] pt-8 px-8 pb-6 relative animate-slide-show sm:mt-[10%]"
      @click.stop
    >
      <main class="flex gap-4">
        <Icon
          :name="customIcon"
          :class="[customIconColor, 'text-2xl mt-px min-w-6']"
        />
        <section>
          <header class="text-lg mb-2">
            {{ modalTitle }}
          </header>
          <p class="text-sm text-gray-700">{{ content }}</p>
        </section>
      </main>
      <!-- footer -->
      <footer class="flex justify-end gap-4 mt-4">
        <button class="btn-default" @click="$emit('closeConfirmModal')">
          {{ cancelBtnText }}
        </button>
        <button
          :class="['btn-primary', 'flex', { 'btn-danger': isDanger }]"
          :disabled="isLoading"
          @click="handleOk"
        >
          <Icon
            v-if="isLoading"
            name="eos-icons:loading"
            class="text-xl m-auto align-middle mr-1"
          />
          {{ okBtnText }}
        </button>
      </footer>
    </div>
  </div>
</template>
