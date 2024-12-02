<script setup lang="ts">
import Tooltip from '@/components/GlobalTooltip.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  idx: {
    type: Number,
    default: 0,
  },
})

const relativeData = reactive(props.data)
const { section } = toRefs(relativeData)

const emit = defineEmits(['onUpdateIsShow', 'onEdit', 'onDelete', 'onCopy'])

const onToggleShowBtn = () => {
  section.value[props.idx].isShow = !section.value[props.idx].isShow
  emit('onUpdateIsShow')
}

const handleEdit = () => {
  emit('onEdit', {
    type: section.value[props.idx]?.type,
    title: 'Edit',
    idx: props.idx,
  })
}

watch(
  () => props.data,
  (newData) => {
    Object.assign(relativeData, newData)
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div
    class="rounded-t-2xl bg-gray-200 flex items-center justify-between px-3 py-1"
  >
    <div class="flex gap-3">
      <Icon
        name="lsicon:drag-filled"
        class="text-2xl text-gray-500 cursor-pointer drag-btn"
      />
      <Icon
        :name="section[idx].isShow ? 'ri:toggle-fill' : 'ri:toggle-line'"
        class="text-2xl text-main-blue cursor-pointer"
        @click="onToggleShowBtn"
      />
    </div>
    <div class="flex gap-4">
      <Tooltip text="Copy">
        <Icon
          name="si:copy-line"
          class="text-lg text-gray-500 cursor-pointer hover:text-main-blue"
          @click="$emit('onCopy', idx)"
        />
      </Tooltip>
      <Tooltip text="Delete">
        <Icon
          name="fluent:delete-32-regular"
          class="text-lg text-gray-500 cursor-pointer hover:text-red-500"
          @click="$emit('onDelete', idx)"
        />
      </Tooltip>
      <Tooltip text="Edit">
        <Icon
          name="hugeicons:pencil"
          class="text-lg text-gray-500 cursor-pointer hover:text-main-blue"
          @click="handleEdit"
        />
      </Tooltip>
    </div>
  </div>
</template>
