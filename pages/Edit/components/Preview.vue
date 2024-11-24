<script setup lang="ts">
import TopButtonBlock from '@/components/door/TopButtonBlock.vue'
import ProfileBlock from '@/components/door/ProfileBlock.vue'

const props = defineProps({
  showPreview: {
    type: Boolean,
    default: false,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
})

defineEmits(['onSave', 'onPreview', 'onCancel', 'onSave'])
</script>

<template>
  <div
    v-if="showPreview"
    class="w-full max-h-dvh h-dvh fixed top-0 left-0 z-30 bg-main-overlay flex"
  >
    <div class="bg-white rounded-2xl w-11/12 h-4/5 m-auto relative">
      <main class="overflow-y-auto h-[calc(100%-60px)] p-4">
        <TopButtonBlock :is-edit="isEdit" :data="data" />
        <ProfileBlock :is-edit="isEdit" :data="data" />
      </main>
      <footer class="p-2.5">
        <button
          class="rounded-full shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)] w-10 h-10 flex items-center justify-center m-auto"
          @click="$emit('onPreview')"
        >
          <Icon name="iconamoon:close-bold" class="text-3xl text-gray-500" />
        </button>
      </footer>
    </div>
  </div>
</template>
