<script setup lang="ts">
import ErrorPage from '../error.vue'
import { useFirestore } from '@/composables/useFirestore'
import { useHandleError } from '@/composables/useHandleError'

import GlobalLoading from '@/components/GlobalLoading.vue'
import TopButtonBlock from '@/pages/Edit/components/block/TopButtonBlock.vue'
import ProfileBlock from '@/pages/Edit/components/block/ProfileBlock.vue'
import { BlockTypeComponent } from '@/pages/Edit/components/block/index'

import type { EditDetail } from '@/types/MainType'

import { transferBgClass } from '@/pages/Edit/transform'

definePageMeta({
  layout: 'share',
})

const { getDocumentByLink } = useFirestore()
const { handleError } = useHandleError()
const route = useRoute()
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
    doorItem.value = resp as EditDetail[]

    hasExistLink.value = Array.isArray(resp) && resp.length > 0
    if (!hasExistLink.value) handleError(404, 'Page Not Found')
  } catch (error) {
    console.error('Error fetching handleCheckLinkExist:', error)
  } finally {
    isLoading.value = false
  }
}

const blockComponent = (type: string) => {
  return BlockTypeComponent[type] || null
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div
    :class="[
      'pb-8',
      'min-h-[calc(100dvh-32px)]',
      transferBgClass('bg', doorItem[0]?.bgColor),
      { 'bg-white': isLoading },
    ]"
  >
    <GlobalLoading v-if="isLoading" class="pt-40" />
    <div v-else>
      <div
        v-if="hasExistLink"
        class="flex flex-col gap-4 px-4 m-auto pt-8 max-w-[500px]"
      >
        <TopButtonBlock :data="doorItem[0]" />
        <ProfileBlock :data="doorItem[0]" />
        <template
          v-for="(section, idx) in doorItem[0].section"
          :key="section.id"
        >
          <component
            :is="blockComponent(section.type)"
            :data="doorItem[0]"
            :idx="idx"
          />
        </template>
      </div>
      <ErrorPage v-else />
    </div>
  </div>
</template>
