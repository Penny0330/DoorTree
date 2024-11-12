<script setup lang="ts">
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
})

// edit mode
const onEditShare = () => {
  console.log('onEditShare')
}

const onEditQRCode = () => {
  console.log('onEditQRCode')
}

const onEditProfile = () => {
  console.log('onEditProfile')
}

// share mode
const onShare = () => {
  console.log('onShare')
}

const onShowQRCode = () => {
  console.log('onShowQRCode')
}
</script>

<template>
  <div class="flex flex-col">
    <!-- share & qrcode -->
    <div class="text-end text-main-blue text-xl px-2">
      <button class="p-1 mr-2" @click="isEdit ? onEditShare() : onShare()">
        <Icon name="mdi:ios-share" />
      </button>
      <button class="p-1" @click="isEdit ? onEditQRCode() : onShowQRCode()">
        <Icon name="ant-design:qrcode-outlined" />
      </button>
    </div>
    <!-- image & name & description -->
    <div class="flex flex-col items-center">
      <img
        src="https://cataas.com/cat?width=100&height=100"
        class="rounded-full mb-6"
      />
      <p class="text-2xl font-medium mb-1">Penny</p>
      <p class="text-slate-700">Welcome to my DoorTree!</p>
    </div>
    <button
      v-if="isEdit"
      class="text-gray-400 text-sm flex items-center justify-center gap-1 w-fit self-center mt-4"
      @click="onEditProfile"
    >
      Edit Profile
      <Icon name="hugeicons:pencil" class="text-gray-400 text-lg" />
    </button>
  </div>
</template>
