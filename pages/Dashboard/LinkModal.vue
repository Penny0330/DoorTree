<script setup lang="ts">
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

const isCreateDisabled = computed(() => !link.value)

const onToggleCreateLinkModal = (_event: MouseEvent) => {
  props.onToggleCreateLinkModal()
}

const onCreateLink = (_event: MouseEvent, link: string) => {
  props.onCreateLink(link)
}
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
            class="flex-1 px-3 py-2"
            placeholder="Enter a custom link"
          />
        </div>
      </section>
      <footer class="flex justify-end gap-4 mt-8">
        <button
          class="btn btn-hollow btn-outline-default cursor-pointer"
          @click="onToggleCreateLinkModal"
        >
          cancel
        </button>
        <button
          :disabled="isCreateDisabled || isCreateLoading"
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
