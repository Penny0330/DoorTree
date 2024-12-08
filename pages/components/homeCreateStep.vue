<script setup lang="ts">
const activeStep = ref<number | null>(null)

const onToggleStep = (idx: number) => {
  if (activeStep.value === idx) {
    activeStep.value = null
    return
  }
  activeStep.value = idx
}

const stepDetailList = [
  {
    title: 'Sign Up',
    details: `Signing up for our simple link in bio maker tools is now faster
              and easier than ever. You can quickly sign up using your Google
              account, or if you prefer, just skip this step and provide your
              name and email. Your privacy is important to us, and we ensure
              your data remains secure.`,
  },
  {
    title: 'Create',
    details: `Signing up for our simple link in bio maker tools is now faster
              and easier than ever. You can quickly sign up using your Google
              account, or if you prefer, just skip this step and provide your
              name and email. Your privacy is important to us, and we ensure
              your data remains secure.`,
  },
  {
    title: 'Share',
    details: `Quickly share your personalized page by copying the link, 
              sharing it on social media, or using a QR code. 
              Let others easily access all of your important links in one place!`,
  },
]
</script>

<template>
  <section
    class="px-8 flex flex-col justify-center lg:items-center my-20 lg:my-24"
  >
    <div class="lg:max-w-[700px] lg:flex lg:flex-col lg:items-center">
      <header
        class="flex flex-col items-center justify-center mb-12 lg:flex-row lg:mb-20"
      >
        <img src="../../assets/home-step.png" alt="home-step" />
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-600 mb-4 lg:text-4xl lg:mb-5">
            Create and customize your DoorTree in minutes
          </p>
          <p class="text-gray-600">
            Connect your TikTok, Instagram, Twitter, website, music, podcast,
            events and more. Or show your images. It all comes together in a
            link in bio landing page designed to convert.
          </p>
        </div>
      </header>
      <div class="flex flex-col gap-4 lg:w-full lg:pl-16 lg:pr-8">
        <div
          v-for="(step, idx) in stepDetailList"
          :key="`step-${idx}`"
          class="border-b pb-4 cursor-pointer"
          @click="onToggleStep(idx)"
        >
          <div class="flex justify-between items-center">
            <header class="flex items-center gap-2">
              <span
                class="border w-6 h-6 flex items-center justify-center rounded-full bg-main-blue text-white"
                >{{ idx + 1 }}</span
              >
              <span class="text-gray-600">{{ step.title }}</span>
            </header>
            <p
              :class="[
                'text-gray-600',
                'transition-transform',
                'duration-200',
                'transform',
                { 'rotate-90': activeStep === idx },
              ]"
            >
              >
            </p>
          </div>
          <p
            v-show="activeStep === idx"
            class="text-gray-400 mt-4 ml-8 animate-slide-show lg:mt-4"
          >
            {{ step.details }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
