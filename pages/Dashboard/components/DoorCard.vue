<script setup lang="ts">
import ActionButton from './ActionButton.vue'
import type { DashboardItem } from '@/types/DashboardType'

defineProps({
  dashboardList: {
    type: Array as PropType<DashboardItem[]>,
    default: () => [],
  },
  label: {
    type: String,
    default: '',
  },
})

defineEmits(['onEdit', 'onShareLink', 'onDelete', 'onShowCreateLinkModal'])
</script>

<template>
  <section
    class="max-w-[1440px] w-10/12 grid grid-rows-1 items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <!-- add button -->
    <div
      class="bg-main-blue text-white w-full p-4 rounded-2xl flex justify-center items-center mt-6 mb-4 cursor-pointer sm:h-full sm:my-0 sm:text-2xl"
      @click="$emit('onShowCreateLinkModal')"
    >
      <Icon
        name="lucide:door-open"
        class="text-white text-2xl mr-4 md:text-3xl"
      />
      Create New
    </div>
    <!-- card item -->
    <div
      v-for="(item, idx) in dashboardList"
      :key="item.id"
      class="border rounded-2xl shadow-md w-full p-4 flex justify-center items-center gap-8 cursor-pointer sm:basis-[calc(50%-1rem)] xl:basis-[calc(25%-1rem)] xl:py-6"
      @click="$emit('onEdit', item.id)"
    >
      <div v-if="item.avatar">
        <img :src="item.avatar" class="rounded-full mb-6" />
      </div>
      <div
        v-else
        class="bg-gray-300 rounded-full w-28 h-28 flex items-center justify-center text-white text-2xl"
      >
        {{ item.title[0].toUpperCase() }}
      </div>
      <div>
        <p class="text-xl">{{ item.link }}</p>
        <div class="flex items-center gap-1 mt-1">
          <Icon name="material-symbols:update" class="text-gray-400 text-sm" />
          <span class="text-xs text-gray-400">{{ item.updateTime }}</span>
        </div>
        <div class="mt-4 flex flex-col gap-2">
          <ActionButton
            icon="hugeicons:pencil"
            label="Edit"
            @click="$emit('onEdit', item.id)"
          />
          <ActionButton
            icon="mage:share"
            label="Share Link"
            @click="$emit('onShareLink', item.link)"
          />
          <ActionButton
            icon="fluent:delete-32-regular"
            label="Delete"
            class="hover:text-red-500"
            @click.stop="$emit('onDelete', item, idx)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
