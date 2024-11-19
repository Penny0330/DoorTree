<script setup lang="ts">
import ShareLinkBlock from './components/ShareLinkBlock.vue'
import GlobalLoading from '@/components/GlobalLoading.vue'
import TopButtonBlock from '@/components/door/TopButtonBlock.vue'
import ProfileBlock from '@/components/door/ProfileBlock.vue'

import { useFirestore } from '@/composables/useFirestore'
import { useHandleError } from '@/composables/useHandleError'
import type { EditDetail, EditModalParams } from '@/types/MainType'
import EditModal from '@/pages/Edit/components/EditModal.vue'
import { useEditModal } from '@/pages/Edit/transform/index'

definePageMeta({
  middleware: 'auth',
})

const { getDocument } = useFirestore()
const { handleError } = useHandleError()
const { showEditModal, openModal, closeModal } = useEditModal()

const route = useRoute()
const id = ref<string | string[]>(route.params.id)
const isLoading = ref<boolean>(true)
const editData = ref<EditDetail | null>(null)
const currentModalTitle = ref<string>('')
const currentModalType = ref<string>('')
const currentModalData = ref<EditDetail | null>(null) // 待定義 type

// get data
const getDetailData = async (): Promise<void> => {
  isLoading.value = true
  const docId = Array.isArray(id.value) ? id.value[0] : id.value
  const resp = await getDocument('doorItemDetail', docId)
  if (!resp) handleError(500, 'Page Not Found')
  editData.value = resp as EditDetail
  isLoading.value = false
}

// params 待定義 type
const handleEdit = (params: EditModalParams) => {
  const { title, type, data } = params
  currentModalTitle.value = title
  currentModalType.value = type
  currentModalData.value = data as EditDetail
  openModal()
}

onMounted(() => {
  getDetailData()
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
            :data="editData || {}"
            @on-edit="handleEdit"
          />
          <ProfileBlock
            :is-edit="true"
            :data="editData || {}"
            @on-edit="handleEdit"
          />
        </div>
      </main>
    </section>
    <EditModal
      :show-edit-modal="showEditModal"
      :title="currentModalTitle"
      :type="currentModalType"
      :data="currentModalData || {}"
      @on-cancel="closeModal"
    />
  </div>
</template>
