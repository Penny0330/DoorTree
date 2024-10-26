<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
console.log(route.params.id)
</script>

<template>
  <div>
    <h1>Edit page</h1>
  </div>
</template>
