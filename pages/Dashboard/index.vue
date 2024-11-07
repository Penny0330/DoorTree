<script setup lang="ts">
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import { CirclePlus, Pencil, Share2, Trash2, DoorOpen } from 'lucide-vue-next'
import LinkModal from './LinkModal.vue'
import type { DashboardItem } from '~/types/DashboardType'
import { useFirestore } from '@/composables/useFirestore'

// import { useShowGlobalToast } from '@/composables/useGlobalToast'

const store = useStore()
const {
  setDocument,
  getDocument,
  updateDocumentArray,
  deleteDocument,
  deleteDocumentArray,
  // getDocumentByLink,
} = useFirestore()
// const showGlobalToast = useShowGlobalToast()

definePageMeta({
  middleware: 'auth',
})

const dashboardList = ref<DashboardItem[]>([])
const isGetLoading = ref<boolean>(true)
const showCreateLinkModal = ref<boolean>(false)
const isCreateLoading = ref<boolean>(false)

// get data
const getDashboardData = async (): Promise<void> => {
  const data = await getDocument('dashboard', store.uid as string)
  dashboardList.value = data?.dashboardList as DashboardItem[]
  isGetLoading.value = false
}

// 用 link 取得 id
// const getShareData = async () => {
//   const data = await getDocumentByLink('doorItemDetail', 'cat')
//   console.log('data: ', data)
// }

// create
const onShowCreateLinkModal = () => {
  showCreateLinkModal.value = true
}

const onToggleCreateLinkModal = () => {
  showCreateLinkModal.value = !showCreateLinkModal.value
}

const onCreateLink = async (link: string) => {
  isCreateLoading.value = true
  const newDashboardItem = {
    id: nanoid(),
    title: link,
    link,
    updateTime: dayjs().format('YYYY/MM/DD HH:mm'),
  }

  await updateDocumentArray(
    'dashboard',
    store.uid as string,
    'dashboardList',
    newDashboardItem,
  )
  createDetail(newDashboardItem.id, link)
  isCreateLoading.value = false
  onToggleCreateLinkModal()
  navigateTo(`/edit/${newDashboardItem.id}`)
}

const createDetail = async (itemId: string, link: string) => {
  const newItem = {
    id: itemId,
    title: link,
    link,
  }
  await setDocument('doorItemDetail', itemId, newItem)
}

// go to edit page
const onEdit = (id: string) => {
  navigateTo(`/edit/${id}`)
}

// go to share page
const onShareLink = (link: string) => {
  navigateTo(`/share/${link}`)
}

// delete
const onDelete = async (removeItem: DashboardItem) => {
  await deleteDocumentArray(
    'dashboard',
    store.uid as string,
    'dashboardList',
    removeItem,
  )
  await deleteDocument('doorItemDetail', removeItem.id)
  getDashboardData()
}

onMounted(() => {
  getDashboardData()
})
</script>

<template>
  <div
    class="bg-white pt-20 pb-8 min-h-[calc(100vh-5rem)] flex flex-col items-center sm:pt-32"
  >
    <section
      class="max-w-[1440px] w-11/12 grid items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-if="!isGetLoading"
        class="bg-main-blue text-white w-full p-4 rounded-2xl flex justify-center items-center mt-6 mb-4 cursor-pointer sm:h-full sm:my-0 sm:text-2xl"
        @click="onShowCreateLinkModal"
      >
        <DoorOpen class="stroke-white mr-4 sm:w-8 sm:h-8" />
        Create New
      </div>
      <div
        v-for="item in dashboardList"
        :key="item.id"
        class="border rounded-2xl w-full p-4 flex justify-center items-center gap-8 cursor-pointer sm:basis-[calc(50%-1rem)] xl:basis-[calc(25%-1rem)] xl:py-6"
        @click="onEdit(item.id)"
      >
        <img
          src="https://fakeimg.pl/100x100/"
          class="rounded-full w-4/12 h-1/3 sm:h-auto"
        />
        <div>
          <p class="text-xl">{{ item.title }}</p>
          <p class="text-xs text-gray-400">updated {{ item.updateTime }}</p>
          <div class="mt-4 flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <Pencil class="w-4 h-4 stroke-gray-500" />
              <span>Edit</span>
            </div>
            <div
              class="flex items-center gap-2"
              @click="onShareLink(item.link)"
            >
              <Share2 class="w-4 h-4 stroke-gray-500" />
              <span>Share Link</span>
            </div>
            <div class="flex items-center gap-2" @click.stop="onDelete(item)">
              <Trash2 class="w-4 h-4 stroke-gray-500" />
              <span>Delete</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="fixed bottom-12 right-4 bg-main-blue rounded-full">
      <CirclePlus
        class="w-10 h-10 stroke-white cursor-pointer"
        @click="onShowCreateLinkModal"
      />
    </div>

    <LinkModal
      v-if="showCreateLinkModal"
      :is-create-loading="isCreateLoading"
      :on-toggle-create-link-modal="onToggleCreateLinkModal"
      :on-create-link="onCreateLink"
    />
  </div>
</template>
