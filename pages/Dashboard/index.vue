<script setup lang="ts">
import type { DashboardItem } from '@/types/DashboardType'
import {
  DefaultDashboardItem,
  DefaultEditDetail,
} from '@/pages/Edit/modal/index'

import { useFirestore } from '@/composables/useFirestore'
import { useShowConfirmModal } from '@/composables/useConfirmModal'
import { useShowGlobalToast } from '@/composables/useGlobalToast'

const store = useStore()
const {
  setDocument,
  getDocument,
  updateDocumentArray,
  deleteDocument,
  deleteDocumentArray,
} = useFirestore()
const showConfirmModal = useShowConfirmModal()
const showGlobalToast = useShowGlobalToast()

definePageMeta({
  middleware: 'auth',
})

const dashboardList = ref<DashboardItem[]>([])
const isGetLoading = ref<boolean>(true)
// create Link
const showCreateLinkModal = ref<boolean>(false)
const isCreateLoading = ref<boolean>(false)
const showShareModal = ref<boolean>(false)
const currentShareLink = ref<string>('')

// get data
const getDashboardData = async (): Promise<void> => {
  isGetLoading.value = true
  const data = await getDocument('dashboard', store.uid as string)
  dashboardList.value = data?.dashboardList.sort(
    (a: DashboardItem, b: DashboardItem) => {
      const dateA = new Date(a.updateTime)
      const dateB = new Date(b.updateTime)
      return dateB.getTime() - dateA.getTime()
    },
  )
  isGetLoading.value = false
}

// create
const onShowCreateLinkModal = () => {
  showCreateLinkModal.value = true
}

const onToggleCreateLinkModal = () => {
  showCreateLinkModal.value = !showCreateLinkModal.value
}

const onCreateLink = async (link: string) => {
  isCreateLoading.value = true
  const newDashboardItem = { ...DefaultDashboardItem, title: link, link }
  await updateDocumentArray(
    'dashboard',
    store.uid as string,
    'dashboardList',
    newDashboardItem,
  )
  await createDetail(newDashboardItem.id, link)
  isCreateLoading.value = false
  onToggleCreateLinkModal()
  navigateTo(`/edit/${newDashboardItem.id}`)
}

const createDetail = async (itemId: string, link: string) => {
  const newItem = {
    ...DefaultEditDetail,
    id: itemId,
    link,
    profile: {
      ...DefaultEditDetail.profile,
      title: link,
    },
  }
  await setDocument('doorItemDetail', itemId, newItem)
}

// go to edit page
const onEdit = (id: string) => {
  navigateTo(`/edit/${id}`)
}

const onToggleShareModal = (link: string) => {
  showShareModal.value = !showShareModal.value
  if (showShareModal.value) {
    currentShareLink.value = link
  }
}

// delete
const onDelete = (item: DashboardItem, idx: number) => {
  showConfirmModal({
    modalTitle: `Delete「${item.link}」`,
    content: 'Are you sure you want to delete? This action cannot be undone.',
    okBtnText: 'delete',
    isDanger: true,
    confirmLoading: true,
    onOk: () => handleDelete(item, idx),
  })
}

const handleDelete = async (removeItem: DashboardItem, idx: number) => {
  await deleteDocumentArray(
    'dashboard',
    store.uid as string,
    'dashboardList',
    removeItem,
  )
  await deleteDocument('doorItemDetail', removeItem.id as string)
  dashboardList.value.splice(idx, 1)
  showGlobalToast({ message: 'Deleted successfully', type: 'success' })
}

onMounted(() => {
  getDashboardData()
})
</script>

<template>
  <div
    class="bg-white pt-20 pb-20 min-h-[calc(100dvh-32px)] flex flex-col items-center sm:pt-32"
  >
    <GlobalLoading v-if="isGetLoading" />
    <template v-else>
      <!-- empty status -->
      <DashboardEmptyCard
        v-if="!dashboardList?.length"
        @on-show-create-link-modal="onShowCreateLinkModal"
      />
      <!-- has data -->
      <DashboardDoorCard
        v-else
        :dashboard-list="dashboardList"
        @on-show-create-link-modal="onShowCreateLinkModal"
        @on-edit="onEdit"
        @on-toggle-share-modal="onToggleShareModal"
        @on-delete="onDelete"
      />
    </template>
    <Icon
      name="carbon:add-alt"
      class="text-main-blue text-4xl fixed bottom-12 right-4 cursor-pointer"
      @click="onShowCreateLinkModal"
    />

    <DashboardLinkModal
      :show-create-link-modal="showCreateLinkModal"
      :is-create-loading="isCreateLoading"
      :on-toggle-create-link-modal="onToggleCreateLinkModal"
      :on-create-link="onCreateLink"
    />
    <DashboardShareModal
      :show-share-modal="showShareModal"
      :current-share-link="currentShareLink"
      @on-toggle-share-modal="onToggleShareModal"
    />
  </div>
</template>
