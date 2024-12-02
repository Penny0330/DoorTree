<script setup lang="ts">
import {
  tagTextAlignOptions,
  themeColorOptions,
  textAlignOptions,
} from '@/pages/Edit/transform/index'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  idx: {
    type: Number,
    default: 0,
  },
})

const relativeData = reactive(props.data)
const imageRefs = ref<Record<string, HTMLInputElement | null>>({})

const onUploadClick = (id: string) => {
  if (imageRefs.value[id]) {
    imageRefs.value[id]?.click()
  }
}

const onPreviewImage = (item, event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      item.previewImage = e.target?.result as string
      item.previewImageFile = file
    }
    reader.readAsDataURL(file)
  }
  input.value = ''
}

const onRemoveImage = (item) => {
  item.previewImage = null
  item.previewImageFile = null
}

const onTagBgColor = (item, color: string) => {
  item.tag.bgColor = color
}
</script>

<template>
  <div>
    <div
      v-for="item in relativeData.section[idx].imageList"
      :key="item.id"
      class="flex flex-col gap-4 mb-4 bg-slate-100 px-2 py-4 rounded-lg"
    >
      <!-- image -->
      <div class="edit-row mb-2">
        <Icon name="ph:image-square" class="text-gray-400 text-2xl" />
        <div
          v-if="!item.previewImage && !item.image"
          class="bg-gray-200 rounded-2xl w-24 h-24 flex items-center justify-center"
        >
          <Icon name="ph:image-square" class="text-gray-300 text-4xl" />
        </div>
        <div v-else class="w-24 h-24 rounded-2xl border bg-gray-300">
          <img
            v-if="item.previewImage"
            :src="item.previewImage"
            alt="Uploaded Image"
            class="w-full h-full object-cover rounded-2xl"
          />
          <img
            v-else-if="item.image && !item.previewImage"
            :src="item.image"
            class="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div class="flex flex-col gap-4">
          <button
            class="btn-circle btn-hoverable"
            @click="onUploadClick(item.id)"
          >
            upload image
          </button>
          <input
            :ref="(el) => (imageRefs[item.id] = el as HTMLInputElement)"
            class="hidden"
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            @change="onPreviewImage(item, $event)"
          />
          <button
            class="btn-circle btn-white rounded-full"
            @click="onRemoveImage(item)"
          >
            remove
          </button>
        </div>
      </div>
      <!-- link -->
      <div class="edit-row">
        <Icon name="ep:link" class="text-gray-400 text-2xl" />
        <input v-model="item.link" class="edit-input" placeholder="link" />
      </div>
      <!-- tag text -->
      <div class="edit-row">
        <Icon name="mynaui:tag" class="text-gray-400 text-2xl" />
        <input
          v-model="item.tag.text"
          class="edit-input"
          placeholder="tag text"
        />
      </div>
      <!-- tag textAlign -->
      <div class="edit-row">
        <div class="edit-select ml-8">
          <label
            v-for="tagTextAlignOption in tagTextAlignOptions"
            :key="tagTextAlignOption.value"
          >
            <input
              v-model="item.tag.textAlign"
              type="radio"
              :value="tagTextAlignOption.value"
            />
            {{ tagTextAlignOption.label }}
          </label>
        </div>
      </div>
      <!-- tag bg color -->
      <div class="edit-row">
        <div class="flex gap-2 flex-wrap ml-8">
          <button
            v-for="color in themeColorOptions"
            :key="color.value"
            :class="[color.label, 'color-select']"
            @click="onTagBgColor(item, color.value)"
          >
            <p v-if="item.tag.bgColor === color.value">v</p>
          </button>
        </div>
      </div>
      <!-- text -->
      <div class="edit-row">
        <Icon name="ion:text-outline" class="text-gray-400 text-2xl" />
        <input
          v-model="item.description.text"
          class="edit-input"
          placeholder="description"
        />
      </div>
      <!-- text text-align -->
      <div class="edit-row pt-4">
        <div class="edit-select ml-8">
          <label
            v-for="textAlignOption in textAlignOptions"
            :key="textAlignOption.value"
          >
            <input
              v-model="item.description.textAlign"
              type="radio"
              :value="textAlignOption.value"
            />
            {{ textAlignOption.label }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
