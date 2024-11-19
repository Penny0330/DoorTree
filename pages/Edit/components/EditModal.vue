<script setup lang="ts">
import { settingTypeComponent } from './setting/index'

const props = defineProps({
  showEditModal: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'Profile',
  },
  title: {
    type: String,
    default: 'Edit',
  },
  data: {
    type: Object,
    default: () => {},
  },
})

defineEmits(['onSave', 'onPreview', 'onCancel'])

// const onCancel = () => {
//   console.log('onCancel')
// }

// const onSave = () => {
//   console.log('onSave')
// }

const onPreview = () => {
  console.log('onPreview')
}

const settingComponent = computed(
  () => settingTypeComponent[props.type] || null,
)
</script>

<template>
  <!-- mask -->
  <div
    v-if="showEditModal"
    class="w-full max-h-dvh h-dvh fixed top-0 left-0 z-30 bg-main-overlay flex"
  >
    <!-- modal -->
    <div class="bg-white rounded-2xl w-11/12 h-4/5 m-auto relative">
      <!-- header -->
      <header
        class="flex justify-between items-center bg-main-blue rounded-tl-2xl rounded-tr-2xl py-3 px-2"
      >
        <button
          class="btn-small text-white btn-hoverable"
          @click="$emit('onCancel')"
        >
          Cancel
        </button>
        <p class="text-white">{{ title }}</p>
        <button class="btn-circle" @click="$emit('onSave')">Save</button>
      </header>
      <!-- setting content -->
      <main class="overflow-y-auto h-[calc(100%-54px-60px)] p-4">
        <component
          :is="settingComponent"
          v-if="settingComponent"
          :data="data"
        />
      </main>
      <!-- preview -->
      <footer class="p-2.5">
        <button class="btn-primary w-full gap-2" @click="onPreview">
          <Icon name="icon-park-outline:preview-open" />
          <p>Preview</p>
        </button>
      </footer>
    </div>
  </div>
</template>
