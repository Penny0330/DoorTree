<script setup lang="ts">
import debounce from 'lodash/debounce'
import { checkLinkTransformType } from './transform'
import { useFirestore } from '@/composables/useFirestore'

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
const hasExistLink = ref<boolean>(false)
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
  <div class="w-full h-dvh fixed top-0 z-30 bg-main-overlay">
    <div
      class="w-11/12 bg-white rounded-2xl m-auto mt-[50%] py-4 px-5 relative sm:mt-[10%] sm:max-w-[500px]"
      @click.stop
    >
      <header class="text-xl text-center my-8">
        Create Your Custom Share Link
      </header>
      <Icon
        name="iconamoon:close"
        class="absolute top-3 right-4 text-gray-400 text-2xl cursor-pointer"
        @click="onToggleCreateLinkModal"
      />
      <section>
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
        <p
          v-if="resultType && !isCheckLoading"
          class="text-red-500 text-sm ml-2"
        >
          {{ checkLinkTransformType[resultType].text }}
        </p>
      </section>
      <footer class="flex justify-end gap-4 mt-8">
        <button
          class="btn btn-hollow btn-outline-default cursor-pointer"
          @click="onToggleCreateLinkModal"
        >
          cancel
        </button>
        <button
          :disabled="isCreateDisabled || isCreateLoading || hasExistLink"
          class="btn btn-solid btn-bg-main-blue w-[78px] cursor-pointer"
          @click="onCreateLink($event, link)"
        >
          <Icon
            v-if="isCreateLoading"
            name="eos-icons:loading"
            class="text-2xl m-auto align-middle"
          />
          <p v-else>create</p>
        </button>
      </footer>
    </div>
  </div>
</template>
