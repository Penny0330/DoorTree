<script setup lang="ts">
import { themeColorOptions } from '@/pages/Edit/transform/index'

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

const typeOptions = [
  { value: 'border-solid', label: 'Solid' },
  { value: 'border-dashed', label: 'Dashed' },
  { value: 'border-dotted', label: 'Dotted' },
  { value: 'border-double', label: 'Double' },
]

const widthOptions = [
  { value: 'border-b', label: 'Extra-Thin' },
  { value: 'border-b-2', label: 'Thin' },
  { value: 'border-b-4', label: 'Thick' },
  { value: 'border-b-8', label: 'Extra-Thick' },
]

const onBorderColor = (color: string) => {
  relativeData.section[props.idx].style.color = color
}
</script>

<template>
  <div>
    <div class="edit-row pt-4">
      <Icon name="fluent-mdl2:line-style" class="text-gray-400 text-2xl" />
      <div class="edit-select">
        <label v-for="typeOption in typeOptions" :key="typeOption.value">
          <input
            v-model="relativeData.section[idx].style.type"
            type="radio"
            :value="typeOption.value"
          />
          {{ typeOption.label }}
        </label>
      </div>
    </div>
    <div class="edit-row pt-4">
      <Icon
        name="material-symbols:line-weight"
        class="text-gray-400 text-2xl"
      />
      <div class="edit-select">
        <label v-for="widthOption in widthOptions" :key="widthOption.value">
          <input
            v-model="relativeData.section[idx].style.width"
            type="radio"
            :value="widthOption.value"
          />
          {{ widthOption.label }}
        </label>
      </div>
    </div>
    <div class="edit-row pt-4">
      <Icon name="proicons:color-palette" class="text-gray-400 text-2xl" />
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="color in themeColorOptions"
          :key="color.value"
          :class="[color.label, 'color-select']"
          @click="onBorderColor(color.value)"
        >
          <p v-if="relativeData.section[idx].style.color === color.value">v</p>
        </button>
      </div>
    </div>
  </div>
</template>
