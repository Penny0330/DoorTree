<script setup lang="ts">
import Draggable from 'vuedraggable'
import { nanoid } from 'nanoid'

import { iconOptions } from '@/pages/Edit/transform'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  idx: {
    type: Number,
    default: 0,
  },
})

const relativeData = reactive({ ...props.data })
const currentSection = computed(() => relativeData.section[props.idx])

const showLogoOptions = ref<boolean>(false)
const onToggleLogoOptions = () => {
  showLogoOptions.value = !showLogoOptions.value
}

const onAddLogo = (item: {
  type: string
  icon: string
  toolTip: string
  placeholder: string
}) => {
  const newLogoItem = {
    id: nanoid(),
    type: item.type,
    icon: item.icon,
    link: '',
    toolTip: item.toolTip,
    placeholder: item.placeholder,
  }
  currentSection.value.logoList.push(newLogoItem)
}

const onDeleteLogo = (idx: number) => {
  currentSection.value.logoList.splice(idx, 1)
}
</script>

<template>
  <div>
    <div>
      <Draggable
        :list="currentSection.logoList"
        item-key="id"
        animation="200"
        handle=".drag-btn"
        class="flex flex-col gap-3"
      >
        <template #item="{ element, index }">
          <div class="flex items-center gap-4">
            <Icon
              name="ic:round-drag-handle"
              class="drag-btn text-4xl text-main-blue cursor-pointer"
            />
            <ToolTip :text="element.toolTip" class="flex">
              <Icon :name="element.icon" class="text-main-blue text-2xl" />
            </ToolTip>
            <input
              v-model="element.link"
              type="text"
              class="edit-input"
              :placeholder="element.placeholder"
            />
            <Icon
              v-if="currentSection.logoList.length > 1"
              name="fluent:delete-32-regular"
              class="text-2xl text-red-500 cursor-pointer"
              @click="onDeleteLogo(index)"
            />
          </div>
        </template>
      </Draggable>
      <div>
        <div
          class="w-full border-2 border-main-blue rounded-xl text-center text-2xl text-man-blue cursor-pointer mt-8 mb-4 hover-transition hover:bg-blue-50"
          @click="onToggleLogoOptions"
        >
          {{ showLogoOptions ? '-' : '+' }}
        </div>
        <div
          v-if="showLogoOptions"
          class="mx-2 p-4 shadow-around-light flex items-center gap-3 flex-wrap"
        >
          <template v-for="item in iconOptions" :key="item.icon">
            <ToolTip :text="item.toolTip" @click="onAddLogo(item)">
              <button
                class="flex p-1 rounded-lg hover:bg-gray-200 hover-transition"
              >
                <Icon :name="item.icon" class="text-3xl text-gray-500" />
              </button>
            </ToolTip>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
