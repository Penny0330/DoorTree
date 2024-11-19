<script setup lang="ts">
import _ from 'lodash'
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
console.log('props.data: ', props.data)
const editModalData = _.cloneDeep(props.data)
const { showShareBtn, showQRCodeBtn } = editModalData

const handleEdit = () => {
  emit('onEdit', {
    type: 'Profile',
    title: 'Button Edit',
    data: editModalData,
  })
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
    <div class="text-end text-main-blue text-xl px-2">
      <!-- edit -->
      <template v-if="isEdit">
        <Tooltip :text="showShareBtn || isEdit ? 'Share' : 'Share (Close)'">
          <button class="p-1 mr-2" @click="handleEdit()">
            <Icon
              name="mdi:ios-share"
              :class="{ 'text-gray-500': !showShareBtn }"
            />
          </button>
        </Tooltip>
        <Tooltip :text="showQRCodeBtn || isEdit ? 'QRCode' : 'QRCode (Close)'">
          <button class="p-1 mr-2" @click="handleEdit()">
            <Icon
              name="ant-design:qrcode-outlined"
              :class="{ 'text-gray-500': !showQRCodeBtn }"
            />
          </button>
        </Tooltip>
      </template>
      <!-- share -->
      <template v-else>
        <Tooltip v-if="showShareBtn" text="Share">
          <button class="p-1 mr-2" @click="onShare()">
            <Icon name="mdi:ios-share" />
          </button>
        </Tooltip>
        <Tooltip v-if="showQRCodeBtn" text="QRCode">
          <button class="p-1 mr-2" @click="onShowQRCode()">
            <Icon name="ant-design:qrcode-outlined" />
          </button>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
