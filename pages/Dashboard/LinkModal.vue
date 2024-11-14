<script setup lang="ts">
import debounce from 'lodash/debounce'
import { checkLinkTransformType } from './transform'
import { useFirestore } from '@/composables/useFirestore'
import CommonDialog from '@/components/CommonDialog.vue'

const { getDocumentByLink } = useFirestore()

const props = defineProps({
  showCreateLinkModal: {
    type: Boolean,
    default: false,
  },
  isCreateLoading: {
    type: Boolean,
    default: false,
  },
  onToggleCreateLinkModal: {
    type: Function,
    default: () => {
      console.warn('onToggleCreateLinkModal not provided')
    },
  },
  onCreateLink: {
    type: Function,
    default: () => {
      console.warn('onCreateLink not provided')
    },
  },
})

const link = ref<string>('')
const domain = ref<string>('door-tree/')
const hasExistLink = ref<boolean>(true)
const isCheckLoading = ref<boolean>(false)
const resultType = ref<string>('')

const isCreateDisabled = computed(
  () => !link.value || link.value.length < 3 || !linkRegex.test(link.value),
)

const linkRegex = /^[a-zA-Z0-9._]+$/

const onToggleCreateLinkModal = (_event: MouseEvent) => {
  props.onToggleCreateLinkModal()
}

const onCreateLink = (_event: MouseEvent, link: string) => {
  props.onCreateLink(link)
}

const handleCheckLinkExist = debounce(async () => {
  try {
    isCheckLoading.value = true
    resultType.value = 'loading'
    const data = await getDocumentByLink('doorItemDetail', link.value)

    hasExistLink.value = Array.isArray(data) && data.length > 0
    resultType.value = hasExistLink.value ? 'exist' : 'success'
  } catch (error) {
    console.error('Error fetching handleCheckLinkExist:', error)
    hasExistLink.value = false
  } finally {
    isCheckLoading.value = false
  }
}, 300)

const handleCheckLinkCount = debounce((newLink: string) => {
  if (newLink.length < 3) {
    resultType.value = 'error'
  } else if (!linkRegex.test(newLink)) {
    resultType.value = 'invalid'
  } else {
    resultType.value = ''
  }
}, 500)

watch(link, (newLink) => {
  link.value = newLink.toLowerCase()
  handleCheckLinkCount(newLink)
  if (!isCreateDisabled.value) {
    isCheckLoading.value = true
    handleCheckLinkExist()
  }
})
</script>

<template>
  <CommonDialog
    :show-dialog="showCreateLinkModal"
    :dialog-title="'Create Your Custom Share Link'"
    @on-close-dialog="onToggleCreateLinkModal"
  >
    <template #modal-body>
      <div class="flex items-center border rounded-md overflow-hidden">
        <span class="pl-3 text-gray-500 cursor-pointer text-nowrap">
          {{ domain }}
        </span>
        <input
          v-model="link"
          type="text"
          class="flex-1 pl-1 pr-3 py-2"
          placeholder="Enter a custom link"
        />
        <component
          :is="checkLinkTransformType[resultType].icon"
          v-if="resultType"
          class="w-5 h-5 mr-2"
        />
      </div>
      <p v-if="resultType && !isCheckLoading" class="text-red-500 text-sm ml-2">
        {{ checkLinkTransformType[resultType].text }}
      </p>
    </template>
    <template #modal-footer>
      <button class="btn-default" @click="onToggleCreateLinkModal">
        cancel
      </button>
      <button
        :disabled="isCreateDisabled || isCreateLoading || hasExistLink"
        class="btn-primary flex"
        @click="onCreateLink($event, link)"
      >
        <Icon
          v-if="isCreateLoading"
          name="eos-icons:loading"
          class="text-2xl m-auto align-middle"
        />
        <p v-else>create</p>
      </button>
    </template>
  </CommonDialog>
</template>
