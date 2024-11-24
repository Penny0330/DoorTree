<script setup lang="ts">
import _ from 'lodash'
import dayjs from 'dayjs'

import ShareLinkBlock from './components/ShareLinkBlock.vue'
import GlobalLoading from '@/components/GlobalLoading.vue'
import EditModal from '@/pages/Edit/components/EditModal.vue'
import Preview from '@/pages/Edit/components/Preview.vue'
import TopButtonBlock from '@/components/door/TopButtonBlock.vue'
import ProfileBlock from '@/components/door/ProfileBlock.vue'

import { useFirestore } from '@/composables/useFirestore'
import { useHandleError } from '@/composables/useHandleError'
import { useShowGlobalToast } from '@/composables/useGlobalToast'
import { useUploadImage } from '@/composables/useUploadImage'
import type { EditDetail, EditModalParams } from '@/types/MainType'
import type { DashboardItem } from '@/types/DashboardType'
import { useEditModal } from '@/pages/Edit/transform/index'

definePageMeta({
  middleware: 'auth',
})

const store = useStore()
const {
  getDocument,
  updateDocument,
  updateDocumentArray,
  deleteDocumentArray,
} = useFirestore()
const { handleError } = useHandleError()
const { showEditModal, openModal, closeModal } = useEditModal()
const showGlobalToast = useShowGlobalToast()
const { uploadImage } = useUploadImage()

const defaultEditDetail: EditDetail = {
  id: '',
  link: 'string',
  showQRCodeBtn: true,
  showShareBtn: true,
  profile: {
    title: '',
    description: '',
    avatar: '',
  },
}

const route = useRoute()
const id = ref<string | string[]>(route.params.id)
const isLoading = ref<boolean>(true)
const editData = ref<EditDetail>(defaultEditDetail)
const dashboardItem = ref<DashboardItem>({})
const currentModalTitle = ref<string>('')
const currentModalType = ref<string>('')
const currentModalData = ref<EditDetail>(defaultEditDetail)
const isSaveLoading = ref<boolean>(false)
const showPreview = ref<boolean>(false)

// get data
const getDetailData = async (): Promise<void> => {
  isLoading.value = true
  const docId = Array.isArray(id.value) ? id.value[0] : id.value
  const resp = await getDocument('doorItemDetail', docId)
  if (!resp) handleError(500, 'Page Not Found')
  editData.value = resp as EditDetail
  isLoading.value = false
}

// get dashboardList
const getDashboardData = async (): Promise<void> => {
  const data = await getDocument('dashboard', store.uid as string)
  const resp = data?.dashboardList as DashboardItem[]
  dashboardItem.value = resp.filter((item) => item.id === id.value)[0]
}

const handleEdit = (params: EditModalParams) => {
  const { title, type, data } = params
  currentModalTitle.value = title
  currentModalType.value = type
  currentModalData.value = _.cloneDeep(data as EditDetail)
  openModal()
}

const onSave = async () => {
  isSaveLoading.value = true
  const uploadedImageUrl = await onUploadAvatar()
  if (uploadedImageUrl) {
    currentModalData.value.profile.avatar = uploadedImageUrl
  }
  editData.value = _.cloneDeep(currentModalData.value as EditDetail)
  delete editData.value.profile.previewImage
  delete editData.value.profile.selectedImage

  // update dashboardList
  await updateDashboardList()
  // update doorDetail
  await updateDocument('doorItemDetail', id.value as string, editData.value)
  isSaveLoading.value = false
  closeModal()
  showGlobalToast({ message: 'Updated successfully', type: 'success' })
}

const onUploadAvatar = async () => {
  if (!currentModalData.value.profile.selectedImage) return
  const imageUrl = await uploadImage(
    currentModalData.value.profile.selectedImage,
  )
  return imageUrl
}

const updateDashboardList = async () => {
  // first delete old dashboardItem
  await deleteDocumentArray(
    'dashboard',
    store.uid as string,
    'dashboardList',
    dashboardItem.value,
  )
  // update dashboardItem
  const newDashboardItem: DashboardItem = {
    id: id.value as string,
    title: currentModalData.value?.profile.title,
    link: currentModalData.value.link,
    avatar: currentModalData.value?.profile.avatar,
    updateTime: dayjs().format('YYYY/MM/DD HH:mm') as string,
  }
  dashboardItem.value = { ...newDashboardItem }
  await updateDocumentArray(
    'dashboard',
    store.uid as string,
    'dashboardList',
    newDashboardItem,
  )
}

const onTogglePreview = () => {
  showPreview.value = !showPreview.value
}

onMounted(() => {
  getDetailData()
  getDashboardData()
})
</script>

<template>
  <div
    class="bg-white pt-20 pb-8 min-h-[calc(100dvh-40px)] flex flex-col items-center sm:pt-32"
  >
    <GlobalLoading v-if="isLoading" />
    <section v-else class="w-11/12">
      <ShareLinkBlock :link="editData?.link" />
      <main class="mt-8">
        <div class="flex flex-col">
          <TopButtonBlock
            :is-edit="true"
            :data="editData"
            @on-edit="handleEdit"
          />
          <ProfileBlock
            :is-edit="true"
            :data="editData"
            @on-edit="handleEdit"
          />
        </div>
      </main>
    </section>
    <EditModal
      :show-edit-modal="showEditModal"
      :title="currentModalTitle"
      :type="currentModalType"
      :data="currentModalData"
      :original-data="editData"
      :is-save-loading="isSaveLoading"
      @on-cancel="closeModal"
      @on-save="onSave"
      @on-preview="onTogglePreview"
    />
    <Preview
      :show-preview="showPreview"
      :is-edit="false"
      :data="currentModalData"
      @on-preview="onTogglePreview"
    />
  </div>
</template>
