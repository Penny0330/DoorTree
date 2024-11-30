<script setup lang="ts">
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
</script>

<template>
  <div>
    <div>
      <div class="edit-row mb-6">
        <Icon name="ph:image-square" class="text-gray-400 text-2xl" />
        <div
          v-if="
            !relativeData.section[idx].previewImage &&
            !relativeData.section[idx].url
          "
          class="bg-gray-200 rounded-2xl w-24 h-24 flex items-center justify-center"
        >
          <Icon name="ph:image-square" class="text-gray-300 text-4xl" />
        </div>
        <div v-else class="w-24 h-24 rounded-2xl border bg-gray-300">
          <img
            v-if="relativeData.section[idx].previewImage"
            :src="relativeData.section[idx].previewImage"
            alt="Uploaded Image"
            class="w-full h-full object-cover rounded-2xl"
          />
          <img
            v-else-if="
              relativeData.section[idx].url &&
              !relativeData.section[idx].previewImage
            "
            :src="relativeData.section[idx].url"
            class="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div class="flex flex-col gap-4">
          <button
            class="btn-circle btn-hoverable"
            @click="$refs.imageItemInput.click()"
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
    </div>
  </div>
</template>
