<script setup lang="ts">
const props = defineProps({
  showDialog: {
    type: Boolean,
    default: true,
  },
  maskCloseable: {
    type: Boolean,
    default: false,
  },
  showCloseBtn: {
    type: Boolean,
    default: true,
  },
  dialogTitle: {
    type: String,
    default: '',
  },
  subTitle: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['onCloseDialog'])

const handleMaskCloseable = () => {
  if (props.maskCloseable) emit('onCloseDialog')
}
</script>

<template>
  <div
    v-if="showDialog"
    class="w-full h-dvh fixed top-0 z-30 bg-main-overlay"
    @click="handleMaskCloseable"
  >
    <div
      class="w-11/12 bg-white rounded-2xl m-auto mt-[50%] py-4 px-5 relative sm:mt-[10%] animate-slide-show sm:max-w-[500px]"
      @click.stop
    >
      <!-- header -->
      <header class="text-xl text-center my-8">
        <p>{{ dialogTitle }}</p>
        <p v-if="subTitle" class="text-sm mt-4 text-gray-400">{{ subTitle }}</p>
        <!-- close icon -->
        <Icon
          v-if="showCloseBtn"
          name="iconamoon:close"
          class="absolute top-3 right-4 text-gray-400 text-2xl cursor-pointer"
          @click="$emit('onCloseDialog')"
        />
      </header>
      <!-- main content -->
      <main>
        <slot name="modal-body" />
      </main>
      <!-- footer -->
      <footer class="flex justify-end gap-4 mt-8">
        <slot name="modal-footer" />
      </footer>
    </div>
  </div>
</template>
