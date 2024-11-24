<script setup lang="ts">
import Tooltip from '../GlobalTooltip.vue'

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['onEdit'])
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
    data: props.data,
  })
}

// share mode
const onShare = () => {
  console.log('onShare')
}

const onShowQRCode = () => {
  console.log('onShowQRCode')
}

watch(
  () => props.data,
  (newData) => {
    relativeData.value = { ...newData }
  },
  { immediate: true },
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
              :class="{ 'text-gray-500': !relativeData.showShareBtn }"
            />
          </button>
        </Tooltip>
        <Tooltip :text="QRCodeBtnToolTipText">
          <button class="p-1 mr-2" @click="handleEdit()">
            <Icon
              name="ant-design:qrcode-outlined"
              :class="{ 'text-gray-500': !relativeData.showQRCodeBtn }"
            />
          </button>
        </Tooltip>
      </template>
      <!-- share -->
      <template v-else>
        <Tooltip v-if="relativeData.showShareBtn" text="Share">
          <button class="p-1 mr-2" @click="onShare()">
            <Icon name="mdi:ios-share" />
          </button>
        </Tooltip>
        <Tooltip v-if="relativeData.showQRCodeBtn" text="QRCode">
          <button class="p-1 mr-2" @click="onShowQRCode()">
            <Icon name="ant-design:qrcode-outlined" />
          </button>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
