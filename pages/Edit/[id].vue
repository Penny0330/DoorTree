<script setup lang="ts">
import _ from 'lodash'
import dayjs from 'dayjs'
import Draggable from 'vuedraggable'

import { nanoid } from 'nanoid'
import ShareLinkBlock from './components/block/ShareLinkBlock.vue'
import GlobalLoading from '@/components/GlobalLoading.vue'
import EditModal from '@/pages/Edit/components/EditModal.vue'
import Preview from '@/pages/Edit/components/Preview.vue'
import AddBlock from '@/pages/Edit/components/AddBlock.vue'
import TopButtonBlock from '@/pages/Edit/components/block/TopButtonBlock.vue'
import ProfileBlock from '@/pages/Edit/components/block/ProfileBlock.vue'
import ToolBar from '@/pages/Edit/components/block/ToolBar.vue'
import { BlockTypeComponent } from '@/pages/Edit/components/block/index'

import { useFirestore } from '@/composables/useFirestore'
import { useHandleError } from '@/composables/useHandleError'
import { useShowGlobalToast } from '@/composables/useGlobalToast'
import { useUploadImage } from '@/composables/useUploadImage'

import type { EditDetail, EditModalParams } from '@/types/MainType'
import type { DashboardItem } from '@/types/DashboardType'

import { useEditModal, createNewSection } from '@/pages/Edit/transform/index'

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
  section: [],
}

const route = useRoute()
const id = ref<string | string[]>(route.params.id)
const isLoading = ref<boolean>(true)
const editData = ref<EditDetail>(defaultEditDetail)
const dashboardItem = ref<DashboardItem>({})
const currentModalTitle = ref<string>('')
const currentModalType = ref<string>('')
const currentModalData = ref<EditDetail>(defaultEditDetail)
const currentModalDataIdx = ref<number>(0)
const isSaveLoading = ref<boolean>(false)
const showPreview = ref<boolean>(false)
const showAddBlockModal = ref<boolean>(false)
const isAddLoading = ref<boolean>(false)

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
  console.log(params)
  const { title, type, idx } = params
  currentModalTitle.value = title
  currentModalType.value = type
  currentModalDataIdx.value = idx
  currentModalData.value = _.cloneDeep(editData.value as EditDetail)
  openModal()
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

const onUploadAvatar = async () => {
  const imageUrl = await uploadImage(
    currentModalData.value.profile.selectedImage,
  )
  if (imageUrl) {
    currentModalData.value.profile.avatar = imageUrl
  }
  editData.value = _.cloneDeep(currentModalData.value as EditDetail)
  delete editData.value.profile.previewImage
  delete editData.value.profile.selectedImage
}

const handleUpdate = async () => {
  // update dashboardList
  await updateDashboardList()
  // update doorDetail
  await updateDocument('doorItemDetail', id.value as string, editData.value)
}

const onSave = async () => {
  isSaveLoading.value = true
  if (currentModalData.value.profile.selectedImage) {
    await onUploadAvatar()
  } else {
    editData.value = _.cloneDeep(currentModalData.value as EditDetail)
  }
  await handleUpdate()
  isSaveLoading.value = false
  closeModal()
  showGlobalToast({ message: 'Updated successfully', type: 'success' })
}

const onTogglePreview = () => {
  showPreview.value = !showPreview.value
}

const onToggleAddBlockModal = () => {
  showAddBlockModal.value = !showAddBlockModal.value
}

const onUpdateIsShow = async () => {
  currentModalData.value = _.cloneDeep(editData.value)
  console.log('editData: ', editData.value)
  console.log('currentModalData: ', currentModalData.value)
  await handleUpdate()
}

const onAddBlock = async (type: 'TEXT' | 'IMAGE' | 'BUTTON') => {
  isAddLoading.value = true
  const newSection = createNewSection(type)
  editData.value.section.push(newSection)
  currentModalData.value = _.cloneDeep(editData.value as EditDetail)
  await handleUpdate()
  isAddLoading.value = false
  onToggleAddBlockModal()
}

const onDelete = async (idx: number) => {
  editData.value.section.splice(idx, 1)
  await handleUpdate()
  showGlobalToast({ message: 'Deleted successfully', type: 'success' })
}

const onCopy = async (idx: number) => {
  const copyData = {
    ...editData.value.section[idx],
    id: nanoid(),
  }
  copyData.isShow = false
  editData.value.section.splice(idx + 1, 0, copyData)
  await handleUpdate()
}

const onChangeSection = async () => {
  currentModalData.value = _.cloneDeep(editData.value as EditDetail)
  await handleUpdate()
}

const blockComponent = (type: string) => {
  return BlockTypeComponent[type] || null
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
    <section
      v-if="!isLoading"
      class="w-11/12 px-0 flex justify-center md:grid md:px-2 md:grid-cols-[1fr_3fr] md:gap-4 md:max-w-[1440px] lg:px-8"
    >
      <AddBlock
        :show-add-block-modal="showAddBlockModal"
        :is-add-loading="isAddLoading"
        @on-toggle-add-block-modal="onToggleAddBlockModal"
        @on-add-block="onAddBlock"
      />
      <main class="md:justify-self-center w-full sm:max-w-[500px]">
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
            <Draggable
              :list="editData.section"
              group="shared"
              item-key="type"
              animation="200"
              handle=".drag-btn"
              :class="{ 'h-32': !editData.section.length }"
              @change="onChangeSection"
            >
              <template #item="{ element, index }">
                <div class="rounded-2xl bg-white shadow-around-light-025 mt-10">
                  <ToolBar
                    :data="editData"
                    :idx="index"
                    @on-update-is-show="onUpdateIsShow"
                    @on-edit="handleEdit"
                    @on-delete="onDelete"
                    @on-copy="onCopy"
                  />
                  <component
                    :is="blockComponent(element.type)"
                    :data="editData"
                    :idx="index"
                    :is-edit="true"
                  />
                </div>
              </template>
            </Draggable>
          </div>
        </div>
      </main>
      <div
        class="w-12 h-12 bg-main-blue opacity-85 rounded-full shadow-around-light flex justify-center items-center fixed bottom-12 left-5 md:hidden"
        @click="onToggleAddBlockModal"
      >
        <Icon name="mingcute:add-fill" class="text-white text-2xl" />
      </div>
    </section>
    <EditModal
      :show-edit-modal="showEditModal"
      :title="currentModalTitle"
      :type="currentModalType"
      :data="currentModalData"
      :idx="currentModalDataIdx"
      :is-save-loading="isSaveLoading"
      @on-cancel="closeModal"
      @on-save="onSave"
      @on-preview="onTogglePreview"
    />
    <!-- <MOB> preview -->
    <div
      v-if="showPreview"
      class="w-full max-h-dvh h-dvh fixed top-0 left-0 z-30 bg-main-overlay flex"
    >
      <Preview
        :show-preview="showPreview"
        :is-edit="false"
        :data="currentModalData"
        @on-preview="onTogglePreview"
      />
    </div>
  </div>
</template>
