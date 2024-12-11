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
const imageItemInput = ref<HTMLInputElement | null>(null)

const handleImageUpload = () => {
  imageItemInput.value?.click()
}

const onPreviewImage = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      relativeData.section[props.idx].previewImage = e.target?.result as string
      relativeData.section[props.idx].previewImageFile = file
    }
    reader.readAsDataURL(file)
  }
  input.value = ''
}

const onRemoveImage = () => {
  relativeData.section[props.idx].previewImage = null
  relativeData.section[props.idx].previewImageFile = null
}

const onTagBgColor = (color: string) => {
  relativeData.section[props.idx].tag.bgColor = color
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- image -->
    <div class="edit-row mb-2">
      <Icon name="ph:image-square" class="text-gray-400 text-2xl" />
      <div class="w-24 h-24 rounded-2xl border bg-gray-300">
        <img
          :src="
            relativeData.section[idx].previewImage ||
            relativeData.section[idx].image
          "
          alt="Uploaded Image"
          class="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div class="flex flex-col gap-4">
        <button
          class="btn-circle btn-hoverable"
          @click="handleImageUpload"
        >
          upload image
        </button>
        <input
          ref="imageItemInput"
          class="hidden"
          type="file"
          accept=".jpg, .jpeg, .png, .gif"
          @change="onPreviewImage"
        />
        <button
          class="btn-circle btn-white rounded-full"
          @click="onRemoveImage"
        >
          remove
        </button>
      </div>
    </div>
    <!-- link -->
    <div class="edit-row">
      <Icon name="ep:link" class="text-gray-400 text-2xl" />
      <input
        v-model="relativeData.section[idx].link"
        class="edit-input"
        placeholder="link"
      />
    </div>
    <!-- tag text -->
    <div class="edit-row">
      <Icon name="mynaui:tag" class="text-gray-400 text-2xl" />
      <input
        v-model="relativeData.section[idx].tag.text"
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
            v-model="relativeData.section[idx].tag.textAlign"
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
          @click="onTagBgColor(color.value)"
        >
          <p v-if="relativeData.section[idx].tag.bgColor === color.value">v</p>
        </button>
      </div>
    </div>
    <!-- text -->
    <div class="edit-row">
      <Icon name="ion:text-outline" class="text-gray-400 text-2xl" />
      <input
        v-model="relativeData.section[idx].description.text"
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
            v-model="relativeData.section[idx].description.textAlign"
            type="radio"
            :value="textAlignOption.value"
          />
          {{ textAlignOption.label }}
        </label>
      </div>
    </div>
  </div>
</template>
