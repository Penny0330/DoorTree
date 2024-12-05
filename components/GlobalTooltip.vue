<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="relative group flex">
    <slot />
    <span
      class="absolute left-1/2 -translate-x-1/2 -bottom-[40px] z-10 mb-1 w-max px-2 py-1 text-sm text-white text-center bg-gray-700 rounded hidden group-hover:block"
    >
      {{ text }}
    </span>
  </div>
</template>
