<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})

const relativeData = reactive(props.data)
const { showShareBtn, showQRCodeBtn, profile } = toRefs(relativeData)

const onToggleShowShareBtn = () => {
  showShareBtn.value = !showShareBtn.value
}

const onToggleShowQRCodeBtn = () => {
  showQRCodeBtn.value = !showQRCodeBtn.value
}

const onPreviewImage = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      relativeData.profile.previewImage = e.target?.result as string
      relativeData.profile.selectedImage = file
    }
    reader.readAsDataURL(file)
  }
  input.value = ''
}

const onRemoveImage = () => {
  relativeData.profile.previewImage = null
  relativeData.profile.selectedImage = null
}
</script>

<template>
  <div>
    <!-- share btn -->
    <div class="edit-row mb-2">
      <Icon name="mdi:ios-share" class="text-gray-400 text-xl" />
      <p>show share button</p>
      <Icon
        v-if="showShareBtn"
        name="ri:toggle-fill"
        class="text-3xl text-main-blue"
        @click="onToggleShowShareBtn"
      />
      <Icon
        v-else
        name="ri:toggle-line"
        class="text-3xl text-main-blue"
        @click="onToggleShowShareBtn"
      />
    </div>
    <!-- QRCode btn -->
    <div class="edit-row">
      <Icon name="ant-design:qrcode-outlined" class="text-gray-400 text-xl" />
      <p>show QRcode button</p>
      <Icon
        v-if="showQRCodeBtn"
        name="ri:toggle-fill"
        class="text-3xl text-main-blue"
        @click="onToggleShowQRCodeBtn"
      />
      <Icon
        v-else
        name="ri:toggle-line"
        class="text-3xl text-main-blue"
        @click="onToggleShowQRCodeBtn"
      />
    </div>
    <div class="border border-gray-100 my-6"></div>
    <!-- avatar、name -->
    <div>
      <p class="text-gray-500 mb-4">Avatar & Name</p>
      <div class="edit-row mb-6">
        <Icon name="gg:profile" class="text-gray-400 text-2xl" />
        <div
          v-if="!relativeData.profile.previewImage && !profile.avatar"
          class="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center text-white text-2xl"
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
        <div class="flex flex-col gap-4">
          <button
            class="btn-circle btn-hoverable"
            @click="$refs.avatarItemInput.click()"
          >
            upload avatar
          </button>
          <input
            ref="avatarItemInput"
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
      <div class="edit-row">
        <Icon
          name="material-symbols:title-rounded"
          class="text-gray-400 text-2xl"
        />
        <input
          v-model="profile.title"
          type="text"
          class="edit-input"
          placeholder="Display name"
        />
      </div>
    </div>
    <div class="border border-gray-100 my-6"></div>
    <!-- description -->
    <div>
      <p class="text-gray-500 mb-4">Profile</p>
      <div class="edit-row items-start">
        <Icon
          name="solar:document-text-outline"
          class="text-gray-400 text-2xl"
        />
        <textarea
          v-model="profile.description"
          class="edit-input"
          placeholder="About you"
        ></textarea>
      </div>
    </div>
  </div>
</template>
