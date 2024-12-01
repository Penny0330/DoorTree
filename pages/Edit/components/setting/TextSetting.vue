<script setup lang="ts">
import {
  fontSizeOptions,
  textAlignOptions,
  themeColorOptions,
} from '@/pages/Edit/transform/index'

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

const onTextColor = (color: string) => {
  relativeData.section[props.idx].style.color = color
}
</script>

<template>
  <div>
    <div>
      <div class="edit-row items-start">
        <Icon name="ion:text-outline" class="text-gray-400 text-2xl" />
        <textarea
          v-model="relativeData.section[idx].text"
          class="edit-input"
          placeholder="header / paragraph"
          cols="50"
          rows="5"
        ></textarea>
      </div>
      <div class="edit-row pt-4">
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
      <div class="edit-row pt-4">
        <div class="edit-select ml-8">
          <label class="custom-checkbox">
            <input
              v-model="relativeData.section[idx].style.isBold"
              type="checkbox"
            />
            Bold
          </label>
          <label class="custom-checkbox">
            <input
              v-model="relativeData.section[idx].style.isItalic"
              type="checkbox"
            />
            Italic
          </label>
          <label class="custom-checkbox">
            <input
              v-model="relativeData.section[idx].style.isUnderline"
              type="checkbox"
            />
            Underline
          </label>
        </div>
      </div>
      <div class="edit-row pt-4">
        <div class="edit-select ml-8">
          <label
            v-for="textAlignOption in textAlignOptions"
            :key="textAlignOption.value"
          >
            <input
              v-model="relativeData.section[idx].style.textAlign"
              type="radio"
              :value="textAlignOption.value"
            />
            {{ textAlignOption.label }}
          </label>
        </div>
      </div>
      <div class="edit-row pt-4">
        <div class="flex gap-2 flex-wrap ml-8">
          <button
            v-for="color in themeColorOptions"
            :key="color.value"
            :class="[color.label, 'color-select']"
            @click="onTextColor(color.value)"
          >
            <p v-if="relativeData.section[idx].style.color === color.value">
              v
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
