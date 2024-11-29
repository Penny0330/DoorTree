<script setup lang="ts">
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
</script>

<template>
  <div>
    <div class="edit-row pt-4">
      <Icon name="fluent-mdl2:line-style" class="text-gray-400 text-2xl" />
      <div v-for="typeOption in typeOptions" :key="typeOption.value">
        <label>
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
      <div v-for="widthOption in widthOptions" :key="widthOption.value">
        <label>
          <input
            v-model="relativeData.section[idx].style.width"
            type="radio"
            :value="widthOption.value"
          />
          {{ widthOption.label }}
        </label>
      </div>
    </div>
  </div>
</template>
