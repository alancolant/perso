<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch, watchEffect} from "vue";
import emblaCarouselVue from 'embla-carousel-vue'

interface Props {
  images: Array<{ src: string, alt: string | undefined }>
  slidesPerView: number
}

const props = withDefaults(defineProps<Props>(), {
  slidesPerView: 1
})

const [emblaNode, emblaApi] = emblaCarouselVue({slidesToScroll: 1})
const selectedScrollSnap = ref(0);

watchEffect(() => {
  if (!emblaApi.value) return
  emblaApi.value?.on('select', (e) => {
    selectedScrollSnap.value = e.selectedScrollSnap()
  })
})
const scrollPrev = () => emblaApi.value?.scrollPrev();
const scrollNext = () => emblaApi.value?.scrollNext();
// const scrollTo = (index: number) => emblaApi.value?.scrollTo(index);
</script>
<template>
  <div class="embla">
    <div class="embla__viewport" ref="emblaNode">
      <div class="embla__container" :style="`--slide-size:${100/slidesPerView}%`">
        <div class="embla__slide" v-for="(image,index) in images">
          <img :src="image.src" :alt="image.alt || `Image ${index}`" :title="image.alt"/>
        </div>

      </div>
    </div>
    <!--NEXT/PREV-->
    <button class="prev" v-if="selectedScrollSnap>0" @click="scrollPrev()">&lt;</button>
    <button class="next" v-if="selectedScrollSnap<images.length-1" @click="scrollNext()">&gt;</button>
    <!--LABEL-->
    <div class="w-full text-center mt-2" v-for="(image,index) in images" v-show="index===selectedScrollSnap">
      {{ image.alt }}
    </div>
  </div>
</template>

<style scoped>
.embla {
  overflow: hidden;
  position: relative;
}

.embla__container {
  /*@apply grid grid-flow-col grid-cols-1;*/
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: var(--slide-size);
}

.embla__slide {
  min-width: 0;
}

.embla__slide img {
  @apply w-full h-full object-cover;
}

.embla :is(.prev,.next) {
  @apply absolute block w-12 h-12 top-1/2 rounded-full bg-gray-500 cursor-pointer -translate-y-1/2;
  font-size: 3rem;
  line-height: 3rem;
  text-align: center;
}

.embla .prev {
  @apply ml-4 left-0;
}

.embla .next {
  @apply right-0 mr-4;
}

</style>
