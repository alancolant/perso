<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch} from "vue";

interface Props {
  images: Array<{ src: string, alt: string | undefined }>
}

const props = defineProps<Props>()

const imageElements = ref<HTMLImageElement[]>([])
const currentImagePosition = ref(0)

const goToPrev = () => {
  imageElements.value.at(currentImagePosition.value - 1)?.scrollIntoView();
  currentImagePosition.value -= 1;
}
const goToNext = () => {
  imageElements.value.at(currentImagePosition.value + 1)?.scrollIntoView();
  currentImagePosition.value += 1;
}

onMounted(() => {
  console.log('mounted')

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    currentImagePosition.value = imageElements.value.findIndex((image) => image === entry.target)
  }))
  imageElements.value.forEach((image) => observer.observe(image))
  onBeforeUnmount(observer.disconnect)
})

</script>
<template>
  <div class="galery-container" ref="galleryContainer">
    <span class="prev" @click="goToPrev" v-if="currentImagePosition>0">&lt;</span>
    <div class="galery">
      <img :id="`image-${index}`"
           v-for="(image,index) in images"
           :src="image.src"
           :alt="image.alt || `Image ${index}`"
           ref="imageElements"/>
    </div>
    <span class="next" @click="goToNext" v-if="currentImagePosition<images?.length-1">&gt;</span>
  </div>

</template>

<style scoped>

.galery-container {
  @apply aspect-[16/9] w-full relative;
}

.galery {
  @apply w-full h-full flex  gap-x-4;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scroll-snap-stop: always;
  -webkit-overflow-scrolling: touch;
}


.galery-container :is(.prev,.next) {
  @apply absolute block w-12 h-12 top-1/2 rounded-full bg-gray-500 cursor-pointer;
  font-size: 3rem;
  line-height: 3rem;
  text-align: center;
}

.galery-container .prev {
  @apply ml-4 left-0;
}

.galery-container .next {
  @apply right-0 mr-4;
}

@media (hover) {
  .galery {
    overflow: hidden;
  }
}

.galery img {
  flex: 0 0 100%;
  display: block;
  scroll-snap-align: center;
  height: auto;
}
</style>
