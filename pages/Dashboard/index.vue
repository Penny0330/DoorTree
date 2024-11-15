<script setup lang="ts">
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import LinkModal from './LinkModal.vue'
import type { DashboardItem } from '@/types/DashboardType'
import { useFirestore } from '@/composables/useFirestore'
import GlobalLoading from '@/components/GlobalLoading.vue'

// import { useShowGlobalToast } from '@/composables/useGlobalToast'

const store = useStore()
const {
  setDocument,
  getDocument,
  updateDocumentArray,
  deleteDocument,
  deleteDocumentArray,
} = useFirestore()
// const showGlobalToast = useShowGlobalToast()

definePageMeta({
  middleware: 'auth',
})

const dashboardList = ref<DashboardItem[]>([])
const isGetLoading = ref<boolean>(true)
// create Link
const showCreateLinkModal = ref<boolean>(false)
const isCreateLoading = ref<boolean>(false)

// get data
const getDashboardData = async (): Promise<void> => {
  isGetLoading.value = true
  const data = await getDocument('dashboard', store.uid as string)
  dashboardList.value = data?.dashboardList as DashboardItem[]
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
  await createDetail(newDashboardItem.id, link)
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
  navigateTo(`/${link}`)
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
    class="bg-white pt-20 pb-8 min-h-[calc(100dvh-40px)] flex flex-col items-center sm:pt-32"
  >
    <GlobalLoading v-if="isGetLoading" />
    <section
      v-else
      class="max-w-[1440px] w-11/12 grid grid-rows-1 items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        class="bg-main-blue text-white w-full p-4 rounded-2xl flex justify-center items-center mt-6 mb-4 cursor-pointer sm:h-full sm:my-0 sm:text-2xl"
        @click="onShowCreateLinkModal"
      >
        <Icon
          name="lucide:door-open"
          class="text-white text-2xl mr-4 md:text-3xl"
        />
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
          <div class="flex items-center gap-1 mt-1">
            <Icon
              name="material-symbols:update"
              class="text-gray-400 text-sm"
            />
            <span class="text-xs text-gray-400">{{ item.updateTime }}</span>
          </div>
          <div class="mt-4 flex flex-col gap-2">
            <div
              class="flex items-center gap-2 hover:underline hover:text-main-blue"
            >
              <Icon name="hugeicons:pencil" class="text-gray-500 text-lg" />
              <span>Edit</span>
            </div>
            <div
              class="flex items-center gap-2 hover:underline hover:text-main-blue"
              @click="onShareLink(item.link)"
            >
              <Icon name="mage:share" class="text-gray-500 text-lg" />
              <span>Share Link</span>
            </div>
            <div
              class="flex items-center gap-2 hover:underline hover:text-red-500"
              @click.stop="onDelete(item)"
            >
              <Icon
                name="fluent:delete-32-regular"
                class="text-gray-500 text-lg"
              />
              <span>Delete</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Icon
      name="carbon:add-alt"
      class="text-main-blue text-4xl fixed bottom-12 right-4 cursor-pointer"
      @click="onShowCreateLinkModal"
    />

    <LinkModal
      :show-create-link-modal="showCreateLinkModal"
      :is-create-loading="isCreateLoading"
      :on-toggle-create-link-modal="onToggleCreateLinkModal"
      :on-create-link="onCreateLink"
    />
  </div>
</template>
