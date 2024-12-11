<script setup lang="ts">
import Draggable from 'vuedraggable'
import { createNewSection } from '@/pages/Edit/transform/index'
import type { AddBlockButton } from '@/types/MainType'

const props = defineProps({
  showAddBlockModal: {
    type: Boolean,
    default: false,
  },
  isAddLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['onToggleAddBlockModal', 'onAddBlock'])

const onOverlayClick = (_event: MouseEvent) => {
  if (_event.target === _event.currentTarget) {
    emit('onToggleAddBlockModal')
  }
}

const addBlockButtonList = ref<AddBlockButton[]>([
  {
    type: 'TEXT',
    icon: 'ion:text-outline',
    text: 'Text',
    toolTip: 'Display header / paragraph',
  },
  {
    type: 'BUTTON',
    icon: 'basil:menu-solid',
    text: 'Button',
    toolTip: 'Text button',
  },
  {
    type: 'LOGO_WALL',
    icon: 'ph:wall',
    text: 'Logo Wall',
    toolTip: 'Display other social link',
  },
  {
    type: 'IMAGE_SINGLE',
    icon: 'ph:image-square',
    text: 'Image(single)',
    toolTip: '1:1 image, supports: JPG, PNG, GIF',
  },
  {
    type: 'IMAGE_DOUBLE',
    icon: 'ph:images-square',
    text: 'Image(double)',
    toolTip: '1:1 double square image, supports: JPG, PNG, GIF',
  },
  {
    type: 'IMAGE_RECTANGLE',
    icon: 'mynaui:image-rectangle',
    text: 'Image (rectangle)',
    toolTip: '2:1 rectangle image, supports: JPG, PNG, GIF',
  },
  {
    type: 'DIVIDER',
    icon: 'fluent-mdl2:line-style',
    text: 'Divider',
    toolTip: 'Lines separating different sections',
  },
])

const newDraggingType = ref<string | null>(null)
const isDragging = ref<boolean>(false)

const cloneBlock = (block: AddBlockButton) => {
  newDraggingType.value = block.type
  const newSection = createNewSection(block.type)
  return {
    ...newSection,
  }
}
</script>

<template>
  <div class="md:w-[320px]">
    <!-- <PC> add block --->
    <div
      class="hidden py-6 px-8 bg-main-blue rounded-2xl w-[320px] mt-16 shadow-[0_7px_29px_0_rgba(100,100,111,0.4)] max-h-[60%] overflow-y-auto md:block md:fixed"
    >
      <div
        class="bg-[#EEE0C9] text-black text-xs px-2 py-1 rounded-md mb-8 flex items-center justify-center gap-2"
      >
        <Icon name="hugeicons:drag-right-02" class="text-lg" />
        <span>Drag blocks to the right layout</span>
      </div>
      <Draggable
        :list="addBlockButtonList"
        :group="{ name: 'shared', pull: 'clone', put: false }"
        :sort="false"
        item-key="type"
        :clone="cloneBlock"
        class="grid grid-cols-1 gap-4"
        ghost-class="dragging"
        @move="isDragging = true"
        @end="isDragging = false"
      >
        <template #item="{ element }">
          <div
            :class="[
              'add-block',
              'btn-hoverable',
              'flex',
              'items-center',
              'gap-4',
              {
                'border-4 mt-8': isDragging && element.type === newDraggingType,
              },
            ]"
          >
            <Icon :name="element.icon" class="add-block__icon" />
            <div class="flex flex-col items-start gap-2">
              <div>{{ element.text }}</div>
              <div class="add-block__tooltip">
                {{ element.toolTip }}
              </div>
            </div>
          </div>
        </template>
      </Draggable>
    </div>
    <!-- <MOB> add block -->
    <div
      v-if="showAddBlockModal"
      class="w-full max-h-dvh h-dvh fixed top-0 left-0 z-30 bg-main-overlay flex items-end justify-center md:hidden"
      @click.prevent="onOverlayClick"
    >
      <div
        class="bg-white rounded-2xl w-11/12 max-w-[580px] h-4/6 p-4 mb-12 relative animate-slide-up"
      >
        <!-- loading -->
        <div
          v-if="isAddLoading"
          class="bg-white opacity-70 w-full h-full rounded-2xl absolute top-0 left-0 z-10 flex items-center justify-center"
        >
          <Icon name="eos-icons:loading" class="text-2xl" />
        </div>
        <!-- header -->
        <div class="text-center text-lg font-medium py-3 border-b-2">
          Add to DoorTree
        </div>
        <Icon
          name="mingcute:close-fill"
          class="absolute right-4 top-4 text-lg text-gray-500"
          @click="$emit('onToggleAddBlockModal')"
        />
        <!-- content -->
        <div class="overflow-y-auto h-full max-h-[calc(100%-54px)]">
          <div
            v-for="block in addBlockButtonList"
            :key="block.type"
            class="flex items-center gap-4 py-3 px-4 border-b"
            @click="$emit('onAddBlock', block.type)"
          >
            <Icon :name="block.icon" class="text-3xl text-main-blue" />
            <div>
              <div class="text-lg">{{ block.text }}</div>
              <div class="text-sm text-gray-500">{{ block.toolTip }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.add-block {
  @apply p-4 bg-white text-center rounded-2xl cursor-pointer;
}
.add-block__icon {
  @apply text-main-blue text-4xl;
}
.add-block__tooltip {
  @apply text-xs text-gray-500 text-start;
}
</style>
