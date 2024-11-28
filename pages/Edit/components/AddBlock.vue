<script setup lang="ts">
import Draggable from 'vuedraggable'
import { nanoid } from 'nanoid'
import { createNewSection } from '@/pages/Edit/transform/index'

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

const availableBlocks = ref([
  { type: 'TEXT', icon: 'ion:text-outline', text: 'Text', isShow: false },
  {
    type: 'DIVIDER',
    icon: 'fluent-mdl2:line-style',
    text: 'Divider',
    isShow: false,
  },
  {
    type: 'SQUARE_SINGLE',
    icon: 'ph:image-square',
    text: 'Square(single)',
    isShow: false,
  },
  {
    type: 'SQUARE_DOUBLE',
    icon: 'ph:images-square',
    text: 'Square(double)',
    isShow: false,
  },
  {
    type: 'RECTANGLE',
    icon: 'mynaui:image-rectangle',
    text: 'Rectangle',
    isShow: false,
  },
  {
    type: 'BUTTON',
    icon: 'basil:menu-solid',
    text: 'Button',
    isShow: false,
  },
  {
    type: 'LOGO_WALL',
    icon: 'ph:wall',
    text: 'Logo Wall',
    isShow: false,
  },
])

const newDraggingType = ref(null)
const cloneBlock = (block) => {
  console.log('cloneBlock', block)
  newDraggingType.value = block.type
  const newSection = createNewSection(block.type)
  return {
    ...newSection,
  }
}
const isDragging = ref(false)
const ontest = (e) => {
  isDragging.value = true
  console.log('log', e)
}
const onEnd = (e) => {
  console.log('onEnd: ', e)
  isDragging.value = false
}
</script>

<template>
  <div class="md:w-[290px]">
    <!-- <PC> add block --->
    <div
      class="hidden py-8 px-6 bg-main-blue rounded-2xl w-[290px] mt-16 shadow-[0_7px_29px_0_rgba(100,100,111,0.4)] md:block md:fixed"
    >
      <div
        class="bg-[#EEE0C9] text-black text-xs text-center px-2 py-1 rounded-md mb-8"
      >
        拖曳新增區塊至右方的編排區
      </div>
      <Draggable
        :list="availableBlocks"
        :group="{ name: 'shared', pull: 'clone', put: false }"
        :sort="false"
        item-key="id"
        :clone="cloneBlock"
        class="grid grid-cols-2 gap-4"
        ghost-class="dragging"
        @move="ontest"
        @end="onEnd"
      >
        <template #item="{ element }">
          <div
            :class="[
              'add-block',
              'btn-hoverable',
              {
                'border-4 mt-8': isDragging && element.type === newDraggingType,
              },
            ]"
          >
            <Icon :name="element.icon" class="add-block__icon" />
            <p class="add-block__text">{{ element.text }}</p>
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
        <div class="text-center text-lg py-3 border-b-2">Add to DoorTree</div>
        <Icon
          name="mingcute:close-fill"
          class="absolute right-4 top-4 text-lg text-gray-500"
          @click="$emit('onToggleAddBlockModal')"
        />
        <!-- content -->
        <div
          class="flex items-center gap-4 py-3 px-4 border-b"
          @click="$emit('onAddBlock', 'TEXT')"
        >
          <Icon name="ion:text-outline" class="text-3xl text-main-blue" />
          <div>
            <div class="text-lg">Text</div>
            <div class="text-sm text-gray-500">header / paragraph</div>
          </div>
        </div>
        <div class="flex items-center gap-4 py-3 px-4 border-b">
          <Icon name="ion:text-outline" class="text-3xl text-main-blue" />
          <div>
            <div class="text-lg">Text</div>
            <div class="text-sm text-gray-500">header / paragraph</div>
          </div>
        </div>
        <div class="flex items-center gap-4 py-3 px-4 border-b">
          <Icon name="ion:text-outline" class="text-3xl text-main-blue" />
          <div>
            <div class="text-lg">Text</div>
            <div class="text-sm text-gray-500">header / paragraph</div>
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
.add-block__text {
  @apply text-gray-600 text-xs;
}
</style>
