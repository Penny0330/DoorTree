<script setup lang="ts">
import Loading from '@/assets/icon/Loading.gif'
</script>

<template>
  <div class="m-auto flex flex-col items-center gap-2">
    <img :src="Loading" alt="loading image" class="w-12" />
    <p class="font-mono">Loading</p>
  </div>
</template>
