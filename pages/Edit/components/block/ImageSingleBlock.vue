<script setup lang="ts">
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
    Object.assign(relativeData, newData)
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <!-- https://fakeimg.pl/300x600 -->
  <div class="flex flex-col mb-8">
    <div class="flex flex-col items-center">
      <div
        v-if="
          !relativeData.section[idx].previewImage &&
          !relativeData.section[idx].url
        "
        class="rounded-2xl w-full h-full aspect-square flex items-center justify-center bg-gray-100"
      >
        <Icon name="ph:image-square" class="text-gray-300 text-4xl" />
      </div>
      <div
        v-else
        class="w-full h-full aspect-square rounded-2xl border bg-gray-300"
      >
        <img
          v-if="relativeData.section[idx].previewImage"
          :src="relativeData.section[idx].previewImage"
          alt="Uploaded Image"
          class="w-full h-full object-cover rounded-2xl"
        />
        <img
          v-else-if="
            relativeData.section[idx].url &&
            !relativeData.section[idx].previewImage
          "
          :src="relativeData.section[idx].url"
          class="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  </div>
</template>
