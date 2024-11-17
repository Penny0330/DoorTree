<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
})

defineEmits(['onClick'])
</script>

<template>
  <div
    class="flex items-center gap-2 hover:underline hover:text-main-blue"
    @click="$emit('onClick')"
  >
    <Icon :name="icon" class="text-gray-500 text-lg" />
    <span>{{ label }}</span>
  </div>
</template>
