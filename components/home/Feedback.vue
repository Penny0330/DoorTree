<script setup lang="ts">
const feedbackList = ref([
  {
    commentator: 'Caleb Stenson',
    avatar:
      'https://res.cloudinary.com/dc8zkjbya/image/upload/v1733736844/tlnhd7zhwdmhtrmdib7p.png',
    content: `DoorTree is very easy to set up and use, with a clean, simple, and sleek page design.
              It's perfect for use in the IG link in bio for different brands!`,
  },
  {
    commentator: 'Paula Sutton',
    avatar:
      'https://res.cloudinary.com/dc8zkjbya/image/upload/v1733737453/ox6tlcc3etbyfdegufjj.png',
    content: `It efficiently increases exposure across various platforms, and through the automatic redirection feature,
              there has been a noticeable growth in Instagram followers. With just one link,`,
  },
  {
    commentator: 'Orson Baker',
    avatar:
      'https://res.cloudinary.com/dc8zkjbya/image/upload/v1733737669/xewmbmcb3wus4p9efdua.png',
    content: `With just one link, it not only keeps your post captions clean
              but also eliminates the worry of the limitation of only one external link on each platform!`,
  },
  {
    commentator: 'Andrew Atlas',
    avatar:
      'https://res.cloudinary.com/dc8zkjbya/image/upload/v1733737755/kzhld0oyfwyp6ucjieug.png',
    content: `The user interface is clear and simple, allowing you to consolidate multiple social media links in one place,
              making social media marketing very convenient.`,
  },
  {
    commentator: 'Emily Jones',
    avatar:
      'https://res.cloudinary.com/dc8zkjbya/image/upload/v1733737876/hcig69dkkj5mkkmo4we9.png',
    content: `It integrates different brand URLs, allowing users to quickly and easily switch between
              desired destinations such as social media, official websites, videos, event pages, and more.`,
  },
  {
    commentator: 'David Hotz',
    avatar:
      'https://res.cloudinary.com/dc8zkjbya/image/upload/v1733747744/k4eutphphj0qei9gnj9s.png',
    content: `Whether you're looking to quickly set up a multi-link page or customize it to create a consistent brand style,
              DoorTree can meet all your needs.`,
  },
])

const currentIndex = ref<number>(0)

const filteredDots = computed(() => {
  return feedbackList.value.slice(0, feedbackList.value.length - 2)
})

const goToSlide = (index: number) => {
  currentIndex.value = index
}
</script>

<template>
  <section
    id="feedback"
    class="px-8 py-20 bg-gradient-to-b from-white to-[#c59650] lg:py-24"
  >
    <div class="flex flex-col items-center">
      <header class="text-center mb-12 lg:mb-20 lg:max-w-[700px]">
        <p class="text-2xl font-bold text-gray-600 mb-4 lg:text-4xl lg:mb-5">
          Community Feedback
        </p>
        <p class="text-gray-600 lg:px-8">
          Insights directly from our valued users
        </p>
      </header>
      <div
        class="relative overflow-hidden m-auto w-full h-[300px] lg:w-[945px] lg:h-[350px]"
      >
        <!-- PC -->
        <div
          class="hidden transition-transform duration-500 ease-in-out w-[300px] gap-4 lg:flex"
          :style="{ transform: `translateX(-${currentIndex * 105}%)` }"
        >
          <div
            v-for="(item, index) in feedbackList"
            :key="index"
            class="min-w-full h-full lg:flex lg:justify-between"
          >
            <div class="box flex">
              <img class="w-12" :src="item.avatar" alt="" />

              <p class="italic">{{ item.content }}</p>
              <p class="text-gray-400 text-xs">- {{ item.commentator }}</p>
            </div>
          </div>
        </div>
        <!-- MOB -->
        <div
          class="flex transition-transform duration-500 ease-in-out lg:hidden"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(item, index) in feedbackList"
            :key="index"
            class="min-w-full h-full lg:flex lg:justify-between"
          >
            <div class="box flex">
              <img class="w-12" :src="item.avatar" alt="" />

              <p class="italic">{{ item.content }}</p>
              <p class="text-gray-400 text-xs">- {{ item.commentator }}</p>
            </div>
          </div>
        </div>
        <!-- dots -->
        <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex">
          <!-- PC -->
          <span
            v-for="(item, index) in filteredDots"
            :key="index"
            class="hidden w-2.5 h-2.5 mx-1 bg-black/50 rounded-full cursor-pointer transition-colors duration-300 lg:block"
            :class="{ 'bg-white w-6': currentIndex === index }"
            @click="goToSlide(index)"
          ></span>
          <!-- MOB -->
          <span
            v-for="(item, index) in feedbackList"
            :key="index"
            class="w-2.5 h-2.5 mx-1 bg-black/50 rounded-full cursor-pointer transition-colors duration-300 lg:hidden"
            :class="{ 'bg-white w-6': currentIndex === index }"
            @click="goToSlide(index)"
          ></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.box {
  @apply h-[280px] border-4 border-yellow-500 bg-white rounded-2xl p-4 flex-col gap-4 lg:w-[300px];
}
</style>
