<script setup lang="ts">
import TopButtonBlock from '@/pages/Edit/components/block/TopButtonBlock.vue'
import ProfileBlock from '@/pages/Edit/components/block/ProfileBlock.vue'
import { BlockTypeComponent } from '@/pages/Edit/components/block/index'

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
  showFooter: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['onSave', 'onPreview', 'onCancel', 'onSave'])

const blockComponent = (type: string) => {
  return BlockTypeComponent[type] || null
}
</script>

<template>
  <div class="bg-white rounded-2xl w-11/12 h-4/5 m-auto relative lg:h-full">
    <main class="overflow-y-auto h-[calc(100%-60px)] p-4 lg:h-full">
      <TopButtonBlock :is-edit="isEdit" :data="data" />
      <ProfileBlock :is-edit="isEdit" :data="data" />
      <template v-for="(section, idx) in data.section" :key="section.id">
        <component
          :is="blockComponent(section.type)"
          :is-edit="isEdit"
          :data="data"
          :idx="idx"
        />
      </template>
    </main>
    <footer v-if="showFooter" class="p-2.5">
      <button
        class="rounded-full shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)] w-10 h-10 flex items-center justify-center m-auto"
        @click="$emit('onPreview')"
      >
        <Icon name="iconamoon:close-bold" class="text-3xl text-gray-500" />
      </button>
    </footer>
  </div>
</template>
