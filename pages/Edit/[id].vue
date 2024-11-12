<script setup lang="ts">
import ShareLinkBlock from './ShareLinkBlock.vue'
import ProfileBlock from '@/components/door/ProfileBlock.vue'
import GlobalLoading from '@/components/GlobalLoading.vue'

import { useFirestore } from '@/composables/useFirestore'
import { useHandleError } from '@/composables/useHandleError'
import type { EditDetail } from '@/types/MainType'

definePageMeta({
  middleware: 'auth',
})

const { getDocument } = useFirestore()
const { handleError } = useHandleError()

const route = useRoute()
const id = ref<string | string[]>(route.params.id)
console.log(route.params.id)
const isLoading = ref<boolean>(true)
const data = ref<EditDetail | null>(null)

// get data
const getDetailData = async (): Promise<void> => {
  isLoading.value = true
  const docId = Array.isArray(id.value) ? id.value[0] : id.value
  const resp = await getDocument('doorItemDetail', docId)
  if (!resp) handleError(500, 'Page Not Found')
  data.value = resp as EditDetail
  console.log(data.value)
  isLoading.value = false
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
      <ShareLinkBlock :link="data?.link" />
      <main class="mt-8">
        <ProfileBlock :is-edit="true" />
      </main>
    </section>
  </div>
</template>
