<script setup lang="ts">
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => ({}),
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
  <div v-if="isEdit || relativeData.section[idx].isShow" class="py-6">
    <div
      :class="[
        `${relativeData.section[idx]?.style.width}`,
        `${relativeData.section[idx]?.style.type}`,
        `${relativeData.section[idx]?.style.color}`,
      ]"
    ></div>
  </div>
</template>
