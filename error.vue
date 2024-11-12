<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    default: () => ({ statusCode: 500 }),
  },
})
</script>

<template>
  <div>
    <p>Page: error</p>
    <h1>{{ error.statusCode }}</h1>
    <nuxt-link to="/" style="margin-right: 8px">回到首頁</nuxt-link>
  </div>
</template>

<style scoped></style>
