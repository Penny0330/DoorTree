<script setup lang="ts">
import _ from 'lodash'
import dayjs from 'dayjs'
import Draggable from 'vuedraggable'
import { nanoid } from 'nanoid'

import { BlockTypeComponent } from '@/components/block/index'

import type { EditDetail, EditModalParams, BlockType } from '@/types/MainType'
import type { DashboardItem } from '@/types/DashboardType'
import {
  DefaultDashboardItem,
  DefaultEditDetail,
} from '@/pages/Edit/modal/index'
import {
  transferSaveData,
  useEditModal,
  createNewSection,
  transferBgClass,
  transformSection,
} from '@/pages/Edit/transform'

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
const showConfirmModal = useShowConfirmModal()
const showGlobalToast = useShowGlobalToast()
const { uploadImage } = useUploadImage()

const route = useRoute()
const id = ref<string | string[]>(route.params.id)
const isLoading = ref<boolean>(true)
const editData = ref<EditDetail>(DefaultEditDetail)
const dashboardItem = ref<DashboardItem>(DefaultDashboardItem)
const currentModalTitle = ref<string>('')
const currentModalType = ref<string>('')
const currentModalData = ref<EditDetail>(DefaultEditDetail)
const currentModalDataIdx = ref<number>(0)
const isSaveLoading = ref<boolean>(false)
const showPreview = ref<boolean>(false)
const showAddBlockModal = ref<boolean>(false)
const isAddLoading = ref<boolean>(false)
const scrollContainer = ref<HTMLElement | null>(null)

// get data
const getDetailData = async (): Promise<void> => {
  isLoading.value = true
  const docId = Array.isArray(id.value) ? id.value[0] : id.value
  const resp = (await getDocument('doorItemDetail', docId)) as EditDetail
  if (!resp) handleError(500, 'Page Not Found')
  editData.value = {
    ...resp,
    section: transformSection(resp.section),
  }
  isLoading.value = false
}

// get dashboardList
const getDashboardData = async (): Promise<void> => {
  const data = await getDocument('dashboard', store.uid as string)
  const resp = data?.dashboardList as DashboardItem[]
  dashboardItem.value = resp.filter((item) => item.id === id.value)[0]
}

const handleEdit = (params: EditModalParams) => {
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
  const newDashboardItem = {
    ...DefaultDashboardItem,
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
    currentModalData.value.profile.previewImageFile as File,
  )
  if (imageUrl) {
    currentModalData.value.profile.avatar = imageUrl
  }
  delete currentModalData.value.profile.previewImage
  delete currentModalData.value.profile.previewImageFile
}

const onUploadImage = async (idx: number) => {
  const section = currentModalData.value.section[idx]

  if (
    (section.type === 'IMAGE_SINGLE' || section.type === 'IMAGE_RECTANGLE') &&
    section.previewImageFile
  ) {
    const imageUrl = await uploadImage(section.previewImageFile)
    section.image = imageUrl
    delete section.previewImage
    delete section.previewImageFile
    editData.value = _.cloneDeep(currentModalData.value as EditDetail)
  }
}

const onUploadDoubleImages = async (idx: number) => {
  const section = currentModalData.value.section[idx]

  if (section.type === 'IMAGE_DOUBLE') {
    for (const item of section.imageList) {
      if (item.previewImageFile) {
        const uploadedUrl = await uploadImage(item.previewImageFile)
        item.image = uploadedUrl

        delete item.previewImage
        delete item.previewImageFile
      }
    }

    editData.value = _.cloneDeep(currentModalData.value as EditDetail)
  }
}

const handleUpdate = async () => {
  // update dashboardList
  await updateDashboardList()
  // update doorDetail
  const saveData = {
    ...editData.value,
    section: transferSaveData(editData.value.section),
  }
  await updateDocument('doorItemDetail', id.value as string, saveData)
}

const handleImageBlock = async () => {
  const index = currentModalData.value.section.findIndex((item) => {
    return (
      ((item.type === 'IMAGE_SINGLE' || item.type === 'IMAGE_RECTANGLE') &&
        item.previewImageFile) ||
      (item.type === 'IMAGE_DOUBLE' &&
        item.imageList.some((image) => image.previewImageFile))
    )
  })

  if (index !== -1) {
    const item = currentModalData.value.section[index]

    if (item.type === 'IMAGE_SINGLE' || item.type === 'IMAGE_RECTANGLE') {
      await onUploadImage(index)
    } else if (item.type === 'IMAGE_DOUBLE') {
      await onUploadDoubleImages(index)
    }
  } else {
    editData.value = _.cloneDeep(currentModalData.value as EditDetail)
  }
}

const onSave = async () => {
  isSaveLoading.value = true
  if (currentModalData.value.profile.previewImageFile) {
    await onUploadAvatar()
  }
  await handleImageBlock()
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
  await handleUpdate()
}

const onAddBlock = async (type: BlockType) => {
  isAddLoading.value = true
  const newSection = createNewSection(type)
  editData.value.section.push(newSection)
  currentModalData.value = _.cloneDeep(editData.value as EditDetail)
  await handleUpdate()
  isAddLoading.value = false
  onToggleAddBlockModal()
  if (scrollContainer.value) {
    window.scrollTo({
      top: scrollContainer.value.scrollHeight,
      behavior: 'smooth',
    })
  }
}

const onDelete = (idx: number) => {
  showConfirmModal({
    modalTitle: `Delete Block`,
    content: 'Are you sure you want to delete? This action cannot be undone.',
    okBtnText: 'delete',
    isDanger: true,
    confirmLoading: true,
    onOk: () => handleDelete(idx),
  })
}

const handleDelete = async (idx: number) => {
  currentModalData.value = _.cloneDeep(editData.value as EditDetail)
  await handleUpdate()
  editData.value.section.splice(idx, 1)
  showGlobalToast({ message: 'Deleted successfully', type: 'success' })
}

const onCopy = async (idx: number) => {
  currentModalData.value = _.cloneDeep(editData.value as EditDetail)
  const copyData = {
    ...currentModalData.value.section[idx],
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
    ref="scrollContainer"
    :class="[
      'pt-20',
      'pb-8',
      'min-h-[calc(100dvh-32px)]',
      'flex',
      'flex-col',
      'items-center',
      'sm:pt-32',
      isLoading ? 'bg-white' : transferBgClass('bg', editData?.bgColor),
    ]"
  >
    <GlobalLoading v-if="isLoading" />
    <section
      v-if="!isLoading"
      class="w-11/12 px-0 flex justify-center md:grid md:px-2 md:grid-cols-[1fr_3fr] md:gap-4 md:max-w-[1440px] lg:px-8"
    >
      <EditAddBlock
        :show-add-block-modal="showAddBlockModal"
        :is-add-loading="isAddLoading"
        @on-toggle-add-block-modal="onToggleAddBlockModal"
        @on-add-block="onAddBlock"
      />
      <main class="md:justify-self-center w-full sm:max-w-[500px]">
        <BlockShareLink :link="editData?.link" />
        <div class="mt-8">
          <div class="flex flex-col rounded-2xl md:p-4">
            <BlockTopButton
              :is-edit="true"
              :data="editData"
              @on-edit="handleEdit"
            />
            <BlockProfile
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
                <div
                  :class="[
                    'rounded-2xl',
                    'shadow-around-light-025',
                    'mt-4',
                    element.type === 'BUTTON' && !element.isFill
                      ? ''
                      : 'bg-white',
                  ]"
                >
                  <BlockToolBar
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
      <EditPreview
        :show-preview="showPreview"
        :is-edit="false"
        :idx="currentModalDataIdx"
        :data="currentModalData"
        @on-preview="onTogglePreview"
      />
    </div>
  </div>
</template>
