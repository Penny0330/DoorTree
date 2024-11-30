<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="relative group inline-block">
    <slot />
    <span
      class="absolute left-1/2 -translate-x-1/2 -bottom-[30px] z-10 mb-1 w-max px-2 py-1 text-sm text-white text-center bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity"
    >
      {{ text }}
    </span>
  </div>
</template>
