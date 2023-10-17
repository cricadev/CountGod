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
  @apply text-[11rem] sm:text-[15rem] tracking-tight font-normal text-center translate-x-[-50%] translate-y-[-50%] font-bebasNeue text-white lg:text-[15rem] xl:text-[18rem] 2xl:text-[22rem] 3xl:text-[30rem] absolute top-1/2 left-1/2;
}

.number-container {
  @apply lg:place-items-center h-full w-full relative lg:grid;

}

.number-label {
  @apply text-center font-bebasNeue text-3xl text-white lg:text-8xl sm:text-5xl absolute bottom-0 left-1/2 translate-x-[-50%];
}
</style>