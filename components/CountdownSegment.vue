<template>
  <div class="w-full h-full number-container" :id="'number--' + number.id" :style="{
    backgroundColor: number.background
  }">
    <Transition class="row-start-1 row-end-2">
      <span v-if="Number(number.number)" class="number " id="number" :key="number.number">{{ number.number }}</span>
      <span class="number" v-else>
        0
      </span>
    </Transition>
    <span class="number-label">{{ number.label }}</span>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  number: {
    type: Object,
    required: true,
    default: null,
  },
})


</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}

.number {
  @apply tracking-tight font-normal text-center translate-x-[-50%] translate-y-[-50%] font-bebasNeue text-white absolute top-1/2 left-1/2;
  font-size: clamp(2rem, 30vw + 1rem, 14rem);

  @media (min-width: 1400px) {
    font-size: clamp(2rem, 30vw + 1rem, 20rem);
  }

  @media (min-width: 1921px) {
    font-size: clamp(2rem, 30vw + 1rem, 25rem);
  }
}

.number-container {
  @apply lg:place-items-center h-full w-full relative lg:grid;
}

.number-label {
  @apply text-start font-bebasNeue text-white absolute bottom-0 left-1/2 translate-x-[-50%] leading-none;

  font-size: clamp(1rem, 10vw + 1rem, 3rem);

  @media (min-width: 1024px) {
    font-size: clamp(2rem, 30vw + 1rem, 6rem);
  }
}
</style>