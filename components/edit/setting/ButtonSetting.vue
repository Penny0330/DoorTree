<script setup lang="ts">
import { fontSizeOptions } from '@/pages/Edit/transform/index'

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

const relativeData = reactive({ ...props.data })
const currentSection = computed(() => relativeData.section[props.idx])

const onToggleFillBtn = () => {
  currentSection.value.isFill = !currentSection.value.isFill
}

const onToggleDescriptionBtn = () => {
  currentSection.value.showDescription = !currentSection.value.showDescription
}
</script>

<template>
  <div>
    <div>
      <!-- button fill -->
      <div class="edit-row mb-2">
        <Icon name="bxs:color-fill" class="text-gray-400 text-2xl" />
        <p>button fill</p>
        <Icon
          :name="currentSection.isFill ? 'ri:toggle-fill' : 'ri:toggle-line'"
          class="text-3xl text-main-blue cursor-pointer"
          @click="onToggleFillBtn"
        />
      </div>
      <!-- text -->
      <div class="edit-row items-start mb-4">
        <Icon name="ion:text-outline" class="text-gray-400 text-2xl" />
        <input
          v-model="currentSection.text"
          class="edit-input"
          placeholder="button text"
        />
      </div>
      <!-- fontSize -->
      <div class="edit-row pb-4">
        <div class="edit-select ml-8">
          <label
            v-for="fontSizeOption in fontSizeOptions"
            :key="fontSizeOption.value"
          >
            <input
              v-model="currentSection.style.fontSize"
              type="radio"
              :value="fontSizeOption.value"
            />
            {{ fontSizeOption.label }}
          </label>
        </div>
      </div>
      <!-- link -->
      <div class="edit-row mb-4">
        <Icon name="ep:link" class="text-gray-400 text-2xl" />
        <input
          v-model="currentSection.link"
          class="edit-input"
          placeholder="button link"
        />
      </div>
      <!-- button description -->
      <div class="edit-row mb-4">
        <Icon name="material-symbols:subject" class="text-gray-400 text-2xl" />
        <p>button description</p>
        <Icon
          :name="
            currentSection.showDescription ? 'ri:toggle-fill' : 'ri:toggle-line'
          "
          class="text-3xl text-main-blue cursor-pointer"
          @click="onToggleDescriptionBtn"
        />
      </div>
      <div v-if="currentSection.showDescription" class="edit-row pl-8">
        <input
          v-model="currentSection.description"
          class="edit-input"
          placeholder="button text"
        />
      </div>
    </div>
  </div>
</template>
