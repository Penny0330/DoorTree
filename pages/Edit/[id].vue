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
const showAddBlockModal = ref<boolean>(false)

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

const onToggleAddBlockModal = () => {
  showAddBlockModal.value = !showAddBlockModal.value
}

onMounted(() => {
  getDetailData()
  getDashboardData()
})
</script>

<template>
  <div
    class="bg-white pt-20 pb-8 min-h-[calc(100dvh-32px)] flex flex-col items-center sm:pt-32"
  >
    <GlobalLoading v-if="isLoading" />
    <section v-if="!isLoading" class="w-11/12 px-0 md:px-2 md:grid md:grid-cols-[1fr_3fr] md:gap-4 md:max-w-[1440px] lg:px-8">
      <!-- <PC> add block -->
      <div class="hidden py-8 px-6 bg-main-blue rounded-2xl w-[290px] mt-16 shadow-[0_7px_29px_0_rgba(100,100,111,0.4)] md:block">
        <div class="bg-[#EEE0C9] text-black text-xs text-center px-2 py-1 rounded-md mb-8">拖曳新增區塊至右方的編排區</div>
        <div class="grid grid-cols-2 gap-4">
          <div class="add-block btn-hoverable">
            <Icon name="ion:text-outline" class="add-block__icon"/>
            <p class="add-block__text">Text</p>
          </div>
          <div class="add-block btn-hoverable">
            <Icon name="fluent-mdl2:line-style" class="add-block__icon"/>
            <p class="add-block__text">Divider</p>
          </div>
          <div class="add-block btn-hoverable">
            <Icon name="ph:wall" class="add-block__icon"/>
            <p class="add-block__text">Logo Wall</p>
          </div>
          <div class="add-block btn-hoverable">
            <Icon name="ph:image-square" class="add-block__icon"/>
            <p class="add-block__text">Square(single)</p>
          </div>
          <div class="add-block btn-hoverable">
            <Icon name="basil:menu-solid" class="add-block__icon"/>
            <p class="add-block__text">Button</p>
          </div>
          <div class="add-block btn-hoverable">
            <Icon name="ph:images-square" class="add-block__icon"/>
            <p class="add-block__text">Square(double)</p>
          </div>
          <div class="add-block btn-hoverable">
            <Icon name="mynaui:image-rectangle" class="add-block__icon"/>
            <p class="add-block__text">Rectangle</p>
          </div>
          <!-- <div class="add-block">
            <Icon name="fluent-mdl2:line-style" class="add-block__icon"/>
            <p class="add-block__text">Divider</p>
          </div> -->
        </div>
      </div>
      <!-- <MOB> add block -->
      <div v-if="showAddBlockModal" class="w-full max-h-dvh h-dvh fixed top-0 left-0 z-30 bg-main-overlay flex items-end justify-center md:hidden">
        <div class="bg-white rounded-2xl w-11/12 max-w-[580px] h-4/6 p-4 mb-12 relative animate-slide-up">
          <div class="text-center text-lg py-3 border-b-2">Add to DoorTree</div>
          <Icon name="mingcute:close-fill" class="absolute right-4 top-4 text-lg text-gray-500"
            @click="onToggleAddBlockModal"/>
          <div class="flex items-center gap-4 py-3 px-4 border-b">
            <Icon name="ion:text-outline" class="text-3xl text-main-blue" />
            <div>
              <div class="text-lg">Text</div>
              <div class="text-sm text-gray-500">header / paragraph</div>
            </div>
          </div>
          <div class="flex items-center gap-4 py-3 px-4 border-b">
            <Icon name="ion:text-outline" class="text-3xl text-main-blue" />
            <div>
              <div class="text-lg">Text</div>
              <div class="text-sm text-gray-500">header / paragraph</div>
            </div>
          </div>
          <div class="flex items-center gap-4 py-3 px-4 border-b">
            <Icon name="ion:text-outline" class="text-3xl text-main-blue" />
            <div>
              <div class="text-lg">Text</div>
              <div class="text-sm text-gray-500">header / paragraph</div>
            </div>
          </div>
        </div>
      </div>
      <main class="md:justify-self-center">
        <ShareLinkBlock :link="editData?.link" />
        <div class="mt-8">
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
        </div>
      </main>
      <div class="w-12 h-12 bg-main-blue opacity-85 rounded-full shadow-around-light flex justify-center items-center fixed bottom-12 md:hidden"
        @click="onToggleAddBlockModal">
        <Icon name="mingcute:add-fill" class="text-white text-2xl"/>
      </div>
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
    <!-- <MOB> preview -->
    <div v-if="showPreview"
      class="w-full max-h-dvh h-dvh fixed top-0 left-0 z-30 bg-main-overlay flex"
      >
      <div class="bg-white rounded-2xl w-11/12 h-4/5 m-auto relative">
        <Preview
          :show-preview="showPreview"
          :is-edit="false"
          :data="currentModalData"
          @on-preview="onTogglePreview"
        />
      </div>
    </div>
  </div>
</template>

<style>
.add-block {
  @apply p-4 bg-white text-center rounded-2xl cursor-pointer;
}
.add-block__icon {
  @apply text-main-blue text-4xl;
}
.add-block__text {
  @apply text-gray-600 text-xs;
}
</style>
