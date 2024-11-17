<script setup lang="ts">
defineEmits(['onShowCreateLinkModal'])
</script>

<template>
  <section
    class="flex flex-col justify-center items-center rounded border-dashed border-4 px-4 pt-10 pb-14 text-sm mt-8 w-11/12 max-w-[1440px]"
  >
    <Icon
      name="material-symbols:light-outline"
      class="text-[50px] text-main-blue mb-4"
    />
    <p class="text-gray-400 text-center mb-4">
      Create new DoorTree to share your everything
    </p>
    <button class="btn-primary" @click="$emit('onShowCreateLinkModal')">
      Create your first Link
    </button>
  </section>
</template>
