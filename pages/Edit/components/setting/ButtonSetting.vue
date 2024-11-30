<script setup lang="ts">
import { fontSizeOptions, textAlignOptions } from '@/pages/Edit/transform/index'

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

const onToggleFillBtn = () => {
  relativeData.section[props.idx].isFill =
    !relativeData.section[props.idx].isFill
}

const onToggleDescriptionBtn = () => {
  relativeData.section[props.idx].showDescription =
    !relativeData.section[props.idx].showDescription
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
          :name="
            relativeData.section[props.idx].isFill
              ? 'ri:toggle-fill'
              : 'ri:toggle-line'
          "
          class="text-3xl text-main-blue cursor-pointer"
          @click="onToggleFillBtn"
        />
      </div>
      <!-- text -->
      <div class="edit-row items-start mb-4">
        <Icon name="ion:text-outline" class="text-gray-400 text-2xl" />
        <input
          v-model="relativeData.section[idx].text"
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
              v-model="relativeData.section[idx].style.fontSize"
              type="radio"
              :value="fontSizeOption.value"
            />
            {{ fontSizeOption.label }}
          </label>
        </div>
      </div>
      <!-- button description -->
      <div class="edit-row mb-4">
        <Icon name="material-symbols:subject" class="text-gray-400 text-2xl" />
        <p>button description</p>
        <Icon
          :name="
            relativeData.section[props.idx].showDescription
              ? 'ri:toggle-fill'
              : 'ri:toggle-line'
          "
          class="text-3xl text-main-blue cursor-pointer"
          @click="onToggleDescriptionBtn"
        />
      </div>
      <div
        v-if="relativeData.section[props.idx].showDescription"
        class="edit-row pl-8"
      >
        <input
          v-model="relativeData.section[idx].description"
          class="edit-input"
          placeholder="button text"
        />
      </div>
    </div>
    <!-- link -->
    <div class="edit-row mb-4">
      <Icon name="ep:link" class="text-gray-400 text-2xl" />
      <input
        v-model="relativeData.section[idx].link"
        class="edit-input"
        placeholder="button link"
      />
    </div>
  </div>
</template>
