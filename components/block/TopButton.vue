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
  showQRCodeModal: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['onEdit', 'onToggleQRCodeModal'])
const relativeData = ref({ ...props.data })

const shareBtnToolTipText = computed(() => {
  if (props.isEdit && !relativeData.value.showShareBtn) {
    return 'Share (Close)'
  }
  return relativeData.value.showShareBtn ? 'Share' : ''
})

const QRCodeBtnToolTipText = computed(() => {
  if (props.isEdit && !relativeData.value.showQRCodeBtn) {
    return 'QRCode (Close)'
  }
  return relativeData.value.showQRCodeBtn ? 'QRCode' : ''
})

const handleEdit = () => {
  emit('onEdit', {
    type: 'Profile',
    title: 'Profile Edit',
  })
}

// share mode
const onShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'DoorTree',
        url: window.location.href,
      })
    } catch (error) {
      console.error('onShare:', error)
    }
  } else {
    console.log('Web Share API is not supported in your browser.')
  }
}

watch(
  () => props.data,
  (newData) => {
    relativeData.value = { ...newData }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div class="flex flex-col">
    <div class="text-main-blue text-xl px-2 pr-6 flex justify-end items-center">
      <!-- edit -->
      <template v-if="isEdit">
        <ToolTip :text="shareBtnToolTipText">
          <button class="p-1 mr-2 flex" @click="handleEdit()">
            <Icon
              name="mdi:ios-share"
              :class="[
                !relativeData.showShareBtn
                  ? 'text-gray-500'
                  : transferThemeClass('text', relativeData.themeColor),
              ]"
            />
          </button>
        </ToolTip>
        <ToolTip :text="QRCodeBtnToolTipText">
          <button class="p-1 mr-2 flex" @click="handleEdit()">
            <Icon
              name="ant-design:qrcode-outlined"
              :class="[
                !relativeData.showQRCodeBtn
                  ? 'text-gray-500'
                  : transferThemeClass('text', relativeData.themeColor),
              ]"
            />
          </button>
        </ToolTip>
      </template>
      <!-- share -->
      <template v-else>
        <ToolTip v-if="relativeData.showShareBtn" text="Share">
          <button class="p-1 mr-2 flex" @click="onShare()">
            <Icon
              name="mdi:ios-share"
              :class="[transferThemeClass('text', relativeData.themeColor)]"
            />
          </button>
        </ToolTip>
        <ToolTip v-if="relativeData.showQRCodeBtn" text="QRCode">
          <button class="p-1 mr-2 flex" @click="$emit('onToggleQRCodeModal')">
            <Icon
              name="ant-design:qrcode-outlined"
              :class="[transferThemeClass('text', relativeData.themeColor)]"
            />
          </button>
        </ToolTip>
      </template>
    </div>
  </div>
</template>
