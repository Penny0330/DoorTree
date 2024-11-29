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
    relativeData.section = newData.section
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <button
    v-if="isEdit || relativeData.section[idx].isShow"
    class="text-center border-2 py-2 px-4 w-full rounded-lg"
    :class="[
      `${relativeData.section[idx]?.style.fontSize}`,
      {
        'bg-blue-200': relativeData.section[idx]?.isFill,
        'border-blue-200': relativeData.section[idx]?.isFill,
      },
    ]"
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
