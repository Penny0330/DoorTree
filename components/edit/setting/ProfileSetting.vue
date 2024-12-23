<script setup lang="ts">
import { themeColorOptions, bgColorOptions } from '@/pages/Edit/transform'
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})

const relativeData = reactive(props.data)
const { showShareBtn, showQRCodeBtn, profile } = toRefs(relativeData)
const avatarItemInput = ref<HTMLInputElement | null>(null)

const handleImageUpload = () => {
  avatarItemInput.value?.click()
}

const onToggleShowShareBtn = () => {
  showShareBtn.value = !showShareBtn.value
}

const onToggleShowQRCodeBtn = () => {
  showQRCodeBtn.value = !showQRCodeBtn.value
}

const onPreviewImage = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      profile.value.previewImage = e.target?.result as string
      profile.value.previewImageFile = file
    }
    reader.readAsDataURL(file)
  }
  input.value = ''
}

const onRemoveImage = () => {
  profile.value.previewImage = null
  profile.value.previewImageFile = null
}

const onThemeColor = (color: string) => {
  relativeData.themeColor = color
}

const onBgColor = (color: string) => {
  relativeData.bgColor = color
}
</script>

<template>
  <div>
    <!-- share btn -->
    <div class="edit-row mb-2">
      <Icon name="mdi:ios-share" class="text-gray-400 text-xl" />
      <p>show share button</p>
      <Icon
        :name="showShareBtn ? 'ri:toggle-fill' : 'ri:toggle-line'"
        class="text-3xl text-main-blue"
        @click="onToggleShowShareBtn"
      />
    </div>
    <!-- QRCode btn -->
    <div class="edit-row">
      <Icon name="ant-design:qrcode-outlined" class="text-gray-400 text-xl" />
      <p>show QRcode button</p>
      <Icon
        :name="showQRCodeBtn ? 'ri:toggle-fill' : 'ri:toggle-line'"
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
          v-if="!profile.previewImage && !profile.avatar"
          class="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center text-white text-2xl"
        >
          {{ relativeData.link[0].toUpperCase() }}
        </div>
        <div v-else class="w-24 h-24 rounded-full border bg-gray-300">
          <img
            v-if="profile.previewImage"
            :src="profile.previewImage || undefined"
            alt="Uploaded Image"
            class="w-full h-full object-cover rounded-full"
          />
          <img
            v-else-if="profile.avatar && !profile.previewImage"
            :src="profile.avatar"
            class="w-full h-full object-cover rounded-full"
          />
        </div>
        <div class="flex flex-col gap-4">
          <button class="btn-circle btn-hoverable" @click="handleImageUpload">
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
    <div class="border border-gray-100 my-6"></div>
    <!-- theme color -->
    <div>
      <p class="text-gray-500 mb-4">Theme Color</p>
      <div class="edit-row items-center">
        <Icon name="proicons:color-palette" class="text-gray-400 text-2xl" />
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="color in themeColorOptions"
            :key="color.value"
            :class="[color.label, 'color-select']"
            @click="onThemeColor(color.value)"
          >
            <p v-if="relativeData.themeColor === color.value">v</p>
          </button>
        </div>
      </div>
    </div>
    <div class="border border-gray-100 my-6"></div>
    <!-- bg color -->
    <div class="pb-8">
      <p class="text-gray-500 mb-4">Background Color</p>
      <div class="edit-row items-center">
        <Icon name="tabler:background" class="text-gray-400 text-2xl" />
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="color in bgColorOptions"
            :key="color.value"
            :class="[color.label, 'color-select']"
            @click="onBgColor(color.value)"
          >
            <p v-if="relativeData.bgColor === color.value">v</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
