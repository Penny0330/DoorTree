<script setup lang="ts">
const blockBoxList = [
  {
    text: 'Text',
    bgColor: 'bg-main-blue',
    shadowColor: 'shadow-main-blue/50',
  },
  {
    text: 'Button',
    bgColor: 'bg-orange-500',
    shadowColor: 'shadow-orange-500/50',
  },
  {
    text: 'Image',
    bgColor: 'bg-red-500',
    shadowColor: 'shadow-red-500/50',
  },
  {
    text: 'Logo',
    bgColor: 'bg-teal-500',
    shadowColor: 'shadow-teal-500/50',
  },
  {
    text: 'Divider',
    bgColor: 'bg-blue-500',
    shadowColor: 'shadow-blue-500/50',
  },
  {
    text: 'Theme',
    bgColor: 'bg-amber-500',
    shadowColor: 'shadow-amber-500/50',
  },
]
</script>

<template>
  <section
    id="feature"
    class="px-8 flex flex-col justify-center items-center py-20 lg:py-24"
  >
    <div class="flex flex-col justify-center items-center">
      <header class="text-center mb-12 lg:mb-20 lg:max-w-[700px]">
        <p class="text-2xl font-bold text-gray-600 mb-4 lg:text-4xl lg:mb-5">
          Customizable Blocks with Tap-and-Drag
        </p>
        <p class="text-gray-600 lg:px-8">
          Easily customize your layout with various block styles. Tap on mobile
          or drag on desktop to rearrange and create your ideal setup.
        </p>
      </header>
      <div class="flex flex-col max-w-[400px] lg:flex-row lg:max-w-full">
        <div
          class="mb-12 grid grid-cols-3 justify-between gap-4 flex-wrap lg:grid-cols-auto lg:gap-8 lg:w-[400px]"
        >
          <template v-for="item in blockBoxList" :key="item.text">
            <div :class="['blockBox', item.bgColor, item.shadowColor]">
              {{ item.text }}
            </div>
          </template>
        </div>
        <div class="relative lg:left-[80px] lg:-top-[30px]">
          <img
            src="../../assets/home-edit-modal.png"
            alt="home-edit-modal"
            class="w-[60%] border border-gray-200 rounded-2xl shadow-around-light lg:w-[50%] lg:max-w-[300px]"
          />
          <img
            src="../../assets/home-edit.png"
            alt="home-edit"
            class="w-[60%] absolute right-[5px] top-[40px] border border-gray-200 rounded-2xl shadow-around-light lg:w-[50%] lg:right-[70px] lg:max-w-[300px]"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blockBox {
  @apply w-full h-full aspect-square  text-white flex items-center justify-center rounded-lg shadow-lg  lg:text-xl;
}
</style>
