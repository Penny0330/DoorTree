<script setup lang="ts">
import { transferBgClass } from '@/pages/Edit/transform'
import { BlockTypeComponent } from '@/components/block/index'

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
  idx: {
    type: Number,
    default: null,
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
  <div class="bg-white rounded-2xl w-11/12 h-4/5 m-auto relative md:h-full">
    <main
      :class="[
        'overflow-y-auto',
        'h-[calc(100%-60px)]',
        'p-4',
        'rounded-2xl',
        'flex',
        'flex-col',
        'gap-4',
        'md:h-full',
        transferBgClass('bg', data.bgColor),
      ]"
    >
      <template v-if="idx === null">
        <BlockTopButton :is-edit="false" :data="data" />
        <BlockProfile :is-edit="false" :data="data" />
        <template v-for="(section, index) in data.section" :key="section.id">
          <component
            :is="blockComponent(section.type)"
            :is-edit="false"
            :data="data"
            :idx="index"
          />
        </template>
      </template>
      <component
        :is="blockComponent(data.section[idx].type)"
        v-else
        :is-edit="true"
        :data="data"
        :idx="idx"
      />
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
