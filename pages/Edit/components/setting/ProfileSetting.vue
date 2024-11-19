<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})
</script>

<template>
  <div>
    test ProfileBlock
    <p>{{ data }}</p>
  </div>
</template>
