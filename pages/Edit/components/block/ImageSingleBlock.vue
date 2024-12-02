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

const onGoToLink = () => {
  const targetUrl = relativeData.section[props.idx].link
  if (!targetUrl) return
  window.open(targetUrl, '_blank')
}

watch(
  () => props.data,
  (newData) => {
    Object.assign(relativeData, newData)
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <!-- https://fakeimg.pl/300x600 -->
  <div class="flex flex-col">
    <div class="flex flex-col items-center">
      <div
        v-if="
          !relativeData.section[idx].previewImage &&
          !relativeData.section[idx].image
        "
        class="rounded-2xl w-full h-full aspect-square flex items-center justify-center bg-gray-100"
        @click="onGoToLink"
      >
        <Icon name="ph:image-square" class="text-gray-300 text-4xl" />
      </div>
      <div
        v-else
        class="w-full h-full aspect-square rounded-2xl border bg-gray-300 relative"
      >
        <img
          :src="
            relativeData.section[idx].previewImage ||
            relativeData.section[idx].image
          "
          class="w-full h-full object-cover rounded-2xl"
          @click="onGoToLink"
        />
        <p
          v-if="relativeData.section[idx].tag.text"
          :class="[
            'absolute',
            'top-2',
            'text-white',
            'px-4',
            'py-1',
            'rounded-2xl',
            `${relativeData.section[idx]?.tag.textAlign}`,
            transferThemeClass('bg', relativeData.section[idx]?.tag.bgColor),
          ]"
        >
          {{ relativeData.section[idx].tag.text }}
        </p>
        <p
          v-if="relativeData.section[idx].description.text"
          :class="[
            'absolute',
            'bottom-0',
            'text-white',
            'px-4',
            'py-2',
            'rounded-b-2xl',
            'w-full',
            `${relativeData.section[idx]?.description.textAlign}`,
            'bg-gradient-to-b',
            'from-transparent',
            'to-black',
            'text-sm',
          ]"
        >
          {{ relativeData.section[idx].description.text }}
        </p>
      </div>
    </div>
  </div>
</template>
