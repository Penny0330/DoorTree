<script setup lang="ts">
import { transferThemeClass } from '@/pages/Edit/transform'

import Tooltip from '@/components/GlobalTooltip.vue'

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
const onShare = () => {
  console.log('onShare')
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
    <div class="text-end text-main-blue text-xl px-2 pr-6">
      <!-- edit -->
      <template v-if="isEdit">
        <Tooltip :text="shareBtnToolTipText">
          <button class="p-1 mr-2" @click="handleEdit()">
            <Icon
              name="mdi:ios-share"
              :class="[
                !relativeData.showShareBtn
                  ? 'text-gray-500'
                  : transferThemeClass('text', relativeData.themeColor),
              ]"
            />
          </button>
        </Tooltip>
        <Tooltip :text="QRCodeBtnToolTipText">
          <button class="p-1 mr-2" @click="handleEdit()">
            <Icon
              name="ant-design:qrcode-outlined"
              :class="[
                !relativeData.showQRCodeBtn
                  ? 'text-gray-500'
                  : transferThemeClass('text', relativeData.themeColor),
              ]"
            />
          </button>
        </Tooltip>
      </template>
      <!-- share -->
      <template v-else>
        <Tooltip v-if="relativeData.showShareBtn" text="Share">
          <button class="p-1 mr-2" @click="onShare()">
            <Icon
              name="mdi:ios-share"
              :class="[transferThemeClass('text', relativeData.themeColor)]"
            />
          </button>
        </Tooltip>
        <Tooltip v-if="relativeData.showQRCodeBtn" text="QRCode">
          <button class="p-1 mr-2" @click="$emit('onToggleQRCodeModal')">
            <Icon
              name="ant-design:qrcode-outlined"
              :class="[transferThemeClass('text', relativeData.themeColor)]"
            />
          </button>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
