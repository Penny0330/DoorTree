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

const onGoToLink = (link: string) => {
  if (!link) return
  window.open(link, '_blank')
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
  <div
    v-if="isEdit || relativeData.section[idx]?.isShow"
    class="grid grid-cols-2 gap-4"
  >
    <div
      v-for="item in relativeData.section[idx]?.imageList"
      :key="item.id"
      class="flex flex-col"
    >
      <div class="flex flex-col items-center">
        <div
          class="w-full h-full aspect-square rounded-2xl border bg-gray-300 relative"
        >
          <img
            :src="item.previewImage || item.image"
            class="w-full h-full object-cover rounded-2xl"
            @click="onGoToLink(item.link)"
          />
          <p
            v-if="item.tag.text"
            :class="[
              'absolute',
              'top-2',
              'text-white',
              'px-4',
              'py-1',
              'rounded-2xl',
              `${item?.tag.textAlign}`,
              transferThemeClass('bg', item?.tag.bgColor),
            ]"
          >
            {{ item.tag.text }}
          </p>
          <p
            v-if="item.description.text"
            :class="[
              'absolute',
              'bottom-0',
              'text-white',
              'px-4',
              'py-2',
              'rounded-b-2xl',
              'w-full',
              `${item?.description.textAlign}`,
              'bg-gradient-to-b',
              'from-transparent',
              'to-black',
              'text-sm',
            ]"
          >
            {{ item.description.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
