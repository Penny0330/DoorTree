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
    </div>
  </div>
</template>
