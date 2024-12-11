<script setup lang="ts">
import { transferThemeClass } from '@/pages/Edit/transform'

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => {},
  },
  idx: {
    type: Number,
    default: 0,
  },
})

const relativeData = ref({ ...props.data })

watch(
  () => props.data,
  (newData) => {
    Object.assign(relativeData.value, newData)
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div
    v-if="isEdit || relativeData.section[idx]?.isShow"
    :class="[
      'flex',
      'items-center',
      'justify-center',
      'gap-3',
      'flex-wrap',
      { 'p-4': isEdit },
    ]"
  >
    <template
      v-for="item in relativeData.section[idx]?.logoList"
      :key="item.id"
    >
      <ToolTip v-if="item.link || isEdit" :text="item.toolTip">
        <a
          :href="item.type === 'E-mail' ? `mailto:${item.link}` : item.link"
          target="_blank"
          class="flex"
        >
          <Icon
            :name="item.icon"
            :class="[
              'text-3xl',
              'hover:opacity-60',
              'hover-transition',
              'cursor-pointer',
              transferThemeClass('text', relativeData.themeColor),
            ]"
          />
        </a>
      </ToolTip>
    </template>
  </div>
</template>
