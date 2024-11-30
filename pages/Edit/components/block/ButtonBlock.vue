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

const relativeData = ref({ ...props.data })

const onGoToLink = () => {
  const targetUrl = relativeData.value.section[props.idx].link
  if (!targetUrl) return
  window.open(targetUrl, '_blank')
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
  <button
    v-if="isEdit || relativeData.section[idx].isShow"
    :class="[
      'text-center',
      'border-2',
      'py-2',
      'px-4',
      'w-full',
      'rounded-lg',
      `${relativeData.section[idx]?.style.fontSize}`,
      transferThemeClass('border', relativeData.themeColor),
      relativeData.section[idx]?.isFill
        ? `${transferThemeClass('bg', relativeData.themeColor)} text-white`
        : transferThemeClass('text', relativeData.themeColor),
    ]"
    @click="onGoToLink"
  >
    {{ relativeData.section[idx]?.text }}
    <div
      v-if="relativeData.section[props.idx].showDescription"
      class="text-sm mt-2"
    >
      {{ relativeData.section[idx]?.description }}
    </div>
  </button>
</template>
