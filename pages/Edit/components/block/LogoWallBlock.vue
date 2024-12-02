<script setup lang="ts">
import { transferThemeClass } from '@/pages/Edit/transform'

import Tooltip from '@/components/GlobalTooltip.vue'

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => {},
  },
  idx: {
    type: Number,
    default: 0,
  },
})

const relativeData = ref({ ...props.data })

const onGoToLink = (link: string) => {
  if (link) window.open(link, '_blank')
}

watch(
  () => props.data,
  (newData) => {
    Object.assign(relativeData.value, newData)
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div
    v-if="isEdit || relativeData.section[idx]?.isShow"
    :class="[
      'flex',
      'items-center',
      'justify-center',
      'gap-3',
      'flex-wrap',
      { 'p-4': isEdit },
    ]"
  >
    <button
      v-for="item in relativeData.section[idx]?.logoList"
      :key="item.id"
      class="text-3xl"
      @click="onGoToLink(item.link)"
    >
      <Tooltip v-if="item.link || isEdit" :text="item.toolTip">
        <Icon
          :name="item.icon"
          :class="[transferThemeClass('text', relativeData.themeColor)]"
        />
      </Tooltip>
    </button>
  </div>
</template>
