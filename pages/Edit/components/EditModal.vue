<script setup lang="ts">
import { settingTypeComponent } from './setting/index'
import Preview from '@/pages/Edit/components/Preview.vue'

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
  idx: {
    type: Number,
    default: 0,
  },
  isSaveLoading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['onSave', 'onPreview', 'onCancel', 'onSave'])

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
    <div
      class="bg-white rounded-2xl w-11/12 max-w-[900px] h-4/5 m-auto relative"
    >
      <!-- header -->
      <header
        class="flex justify-between items-center bg-main-blue rounded-tl-2xl rounded-tr-2xl py-3 px-2"
      >
        <button
          class="btn-small text-white btn-hoverable"
          :disabled="isSaveLoading"
          @click="$emit('onCancel')"
        >
          Cancel
        </button>
        <p class="text-white">{{ title }}</p>
        <button
          class="btn-circle btn-circle-hoverable"
          @click="$emit('onSave')"
        >
          <Icon
            v-if="isSaveLoading"
            name="eos-icons:loading"
            class="mr-1.5 hover:text-main-blue"
          />
          <p>Save</p>
        </button>
      </header>
      <main class="flex h-[calc(100%-54px-60px)] p-4 md:h-[calc(100%-54px)]">
        <!-- setting content -->
        <component
          :is="settingComponent"
          v-if="settingComponent"
          :data="data"
          :idx="idx"
          class="overflow-y-auto w-full md:flex-1"
        />
        <!-- <PC> preview -->
        <section class="hidden md:block md:flex-1">
          <Preview
            :show-preview="true"
            :is-edit="false"
            :data="data"
            :show-footer="false"
          />
        </section>
      </main>
      <!-- <MOB> preview button -->
      <footer class="p-2.5 md:hidden">
        <button class="btn-primary w-full gap-2" @click="$emit('onPreview')">
          <Icon name="icon-park-outline:preview-open" />
          <p>Preview</p>
        </button>
      </footer>
    </div>
  </div>
</template>
