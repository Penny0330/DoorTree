<script setup lang="ts">
import { transferThemeClass } from '@/pages/Edit/transform'

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

const relativeData = reactive({ ...props.data })

watch(
  () => props.data,
  (newData) => {
    relativeData.section = newData.section
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div
    v-if="isEdit || relativeData.section[idx].isShow"
    :class="[
      'p-4',
      `${relativeData.section[idx]?.style.fontSize}`,
      `${relativeData.section[idx]?.style.textAlign}`,
      transferThemeClass('text', relativeData.section[idx]?.style.color),
      {
        italic: relativeData.section[idx]?.style.isItalic,
        underline: relativeData.section[idx]?.style.isUnderline,
        'font-bold': relativeData.section[idx]?.style.isBold,
      },
    ]"
  >
    {{ relativeData.section[idx]?.text }}
  </div>
</template>
