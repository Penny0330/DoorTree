<script setup lang="ts">
import ErrorPage from '../error.vue'
import Loading from '../../assets/icon/Loading.gif'
import { useFirestore } from '@/composables/useFirestore'
import { useHandleError } from '@/composables/useHandleError'
import ProfileBlock from '@/components/door/ProfileBlock.vue'

import type { EditDetail } from '~/types/MainType'

definePageMeta({
  layout: 'share',
})

const { getDocumentByLink } = useFirestore()
const { handleError } = useHandleError()
const route = useRoute()
// const router = useRouter()
console.log(route.params.id)
const isLoading = ref<boolean>(true)
const hasExistLink = ref<boolean>(false)
const doorItem = ref<EditDetail[]>([])

const getData = async () => {
  isLoading.value = true
  try {
    const resp = await getDocumentByLink(
      'doorItemDetail',
      route.params.id as string,
    )
    console.log('resp', resp)
    doorItem.value = resp as EditDetail[]

    hasExistLink.value = Array.isArray(resp) && resp.length > 0
    console.log('hasExistLink: ', hasExistLink.value)
    if (!hasExistLink.value) handleError(404, 'Page Not Found')
  } catch (error) {
    console.error('Error fetching handleCheckLinkExist:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div
    class="bg-white pt-20 pb-8 min-h-[calc(100dvh-24px)] flex flex-col items-center sm:pt-32"
  >
    <img v-if="isLoading" :src="Loading" alt="" class="w-12" />
    <div v-else>
      <div v-if="hasExistLink">
        <ProfileBlock />
      </div>
      <ErrorPage v-else />
    </div>
  </div>
</template>
