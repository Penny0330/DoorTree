<script setup lang="ts">
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import type { DashboardItem } from '~/types/interfaces'
import { useFirestore } from '@/composables/useFirestore'

const nuxtApp = useNuxtApp()
const store = useStore()
const {
  setDocument,
  getDocument,
  updateDocumentArray,
  deleteDocument,
  deleteDocumentArray,
} = useFirestore()

definePageMeta({
  middleware: 'auth',
})

const dashboardList = ref<DashboardItem[]>([])

// get data
const getDashboardData = async (): Promise<void> => {
  const data = await getDocument('dashboard', store.uid as string)
  dashboardList.value = data?.dashboardList as DashboardItem[]
}

// update Doc
const updateDashboardData = async (): Promise<void> => {
  const newDashboardItem = {
    id: nanoid(),
    link: '',
    title: '',
    updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }

  await updateDocumentArray(
    'dashboard',
    store.uid as string,
    'dashboardList',
    newDashboardItem,
  )
  createDetail(newDashboardItem.id)
  getDashboardData()
}

// create detail table
const createDetail = async (itemId: string) => {
  const newItem = {
    id: itemId,
    text: '測試',
  }
  await setDocument('doorItemDetail', itemId, newItem)
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

// 取整個文件
// const querySnapshot = await getDocs(collection(nuxtApp.$db, 'dashboard'))
// querySnapshot.forEach((doc) => {
//   console.log('doc ', doc)
//   console.log(`${doc.id} => ${doc.data()}`)
// })
</script>

<template>
  <div class="bg-white pt-24 min-h-[calc(100vh-5rem)]">
    <p>Dashboard</p>
    <button @click="updateDashboardData">測試 update</button>
    <div
      v-for="item in dashboardList"
      :key="item.id"
      class="border"
      @click="onDelete(item)"
    >
      <p>id: {{ item.id }}</p>
      <p>title: {{ item.title }}</p>
    </div>
  </div>
</template>
