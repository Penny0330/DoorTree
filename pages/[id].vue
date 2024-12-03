<script setup lang="ts">
import QRCode from 'qrcode'
import ErrorPage from '../error.vue'
import { useFirestore } from '@/composables/useFirestore'
import { useHandleError } from '@/composables/useHandleError'

import GlobalLoading from '@/components/GlobalLoading.vue'
import QRCodeModal from '@/components/QRCoddeModal.vue'
import TopButtonBlock from '@/pages/Edit/components/block/TopButtonBlock.vue'
import ProfileBlock from '@/pages/Edit/components/block/ProfileBlock.vue'
import { BlockTypeComponent } from '@/pages/Edit/components/block/index'

import type { EditDetail } from '@/types/MainType'

import { transferBgClass } from '@/pages/Edit/transform'

definePageMeta({
  layout: 'share',
})

const { getDocumentByLink } = useFirestore()
const { handleError } = useHandleError()
const route = useRoute()
const isLoading = ref<boolean>(true)
const hasExistLink = ref<boolean>(false)
const doorItem = ref<EditDetail[]>([])
const showQRCodeModal = ref<boolean>(false)
const QRCodeImage = ref<string>('')
const pathUrl = computed(
  () => `https://door-tree.vercel.app/${route.params.id}`,
)

const getData = async () => {
  isLoading.value = true
  try {
    const resp = await getDocumentByLink(
      'doorItemDetail',
      route.params.id as string,
    )
    doorItem.value = resp as EditDetail[]

    hasExistLink.value = Array.isArray(resp) && resp.length > 0
    if (!hasExistLink.value) handleError(404, 'Page Not Found')
    else handleQRCode()
  } catch (error) {
    console.error('Error fetching handleCheckLinkExist:', error)
  } finally {
    isLoading.value = false
  }
}

const blockComponent = (type: string) => {
  return BlockTypeComponent[type] || null
}

const handleQRCode = async () => {
  try {
    QRCodeImage.value = await QRCode.toDataURL(pathUrl.value)
  } catch (error) {
    console.error('handleQRCode: ', error)
  }
}

const onToggleQRCodeModal = () => {
  showQRCodeModal.value = !showQRCodeModal.value
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div
    :class="[
      'pb-8',
      'min-h-[calc(100dvh-32px)]',
      transferBgClass('bg', doorItem[0]?.bgColor),
      { 'bg-white': isLoading },
    ]"
  >
    <GlobalLoading v-if="isLoading" class="pt-40" />
    <div v-else>
      <div
        v-if="hasExistLink"
        class="flex flex-col gap-4 px-4 m-auto pt-8 max-w-[500px]"
      >
        <TopButtonBlock
          :data="doorItem[0]"
          @on-toggle-q-r-code-modal="onToggleQRCodeModal"
        />
        <ProfileBlock :data="doorItem[0]" />
        <template
          v-for="(section, idx) in doorItem[0].section"
          :key="section.id"
        >
          <component
            :is="blockComponent(section.type)"
            :data="doorItem[0]"
            :idx="idx"
          />
        </template>
      </div>
      <ErrorPage v-else />
    </div>
    <QRCodeModal
      :show-q-r-code-modal="showQRCodeModal"
      :qr-code-image="QRCodeImage"
      :path-url="pathUrl"
      @on-toggle-q-r-code-modal="onToggleQRCodeModal"
    />
  </div>
</template>
