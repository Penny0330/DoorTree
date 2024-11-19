<script setup lang="ts">
import _ from 'lodash'

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
console.log('props.data: ', props.data)
const editModalData = _.cloneDeep(props.data)
const { profile } = editModalData

const handleEdit = () => {
  emit('onEdit', {
    type: 'Profile',
    title: 'Profile Edit',
    data: editModalData,
  })
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col items-center">
      <div v-if="profile.avatar">
        <img
          src="https://cataas.com/cat?width=100&height=100"
          class="rounded-full mb-6"
        />
      </div>
      <div
        v-else
        class="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center text-white text-2xl"
      >
        {{ profile.title[0].toUpperCase() }}
      </div>
      <p class="text-2xl font-medium mt-4 mb-2">{{ profile.title }}</p>
      <p class="text-slate-700">{{ profile.description }}</p>
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
