<script setup lang="ts">
import { transferThemeClass } from '@/pages/Edit/transform'

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['onEdit'])
const relativeData = reactive({ ...props.data })
const profile = computed(() => relativeData.profile)

const handleEdit = () => {
  emit('onEdit', {
    type: 'Profile',
    title: 'Profile Edit',
  })
}

watch(
  () => props.data,
  (newData) => {
    Object.assign(relativeData, newData)
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div class="flex flex-col mb-8">
    <div class="flex flex-col items-center">
      <div
        v-if="!relativeData.profile.previewImage && !profile.avatar"
        :class="[
          'rounded-full',
          'w-24',
          'h-24',
          'flex',
          'items-center',
          'justify-center',
          'text-white',
          'text-2xl',
          'opacity-70',
          transferThemeClass('bg', relativeData.themeColor),
        ]"
      >
        {{ profile.title[0].toUpperCase() }}
      </div>
      <div v-else class="w-24 h-24 rounded-full border bg-gray-300">
        <img
          v-if="relativeData.profile.previewImage"
          :src="relativeData.profile.previewImage || undefined"
          alt="Uploaded Image"
          class="w-full h-full object-cover rounded-full"
        />
        <img
          v-else-if="profile.avatar && !relativeData.profile.previewImage"
          :src="profile.avatar"
          class="w-full h-full object-cover rounded-full"
        />
      </div>
      <p class="text-2xl font-medium mt-4 mb-2">
        {{ profile.title }}
      </p>
      <p class="text-slate-700 whitespace-pre-wrap text-center">
        {{ profile.description }}
      </p>
    </div>
    <button
      v-if="isEdit"
      class="text-gray-400 text-sm flex items-center justify-center gap-1 w-fit self-center mt-10"
      @click="handleEdit"
    >
      Edit Profile
      <Icon name="hugeicons:pencil" class="text-gray-400 text-lg" />
    </button>
  </div>
</template>
