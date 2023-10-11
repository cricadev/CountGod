<template>
  <div class="w-full h-full number-container" :style="{
    backgroundColor: number.background
  }">
    <Transition class="row-start-1 row-end-2">
      <div v-if="Number(number.number)" class="number " id="number" :key="number.number">{{ number.number }}</div>
      <div class="number" v-else>
        0
      </div>
    </Transition>
    <span class="row-start-2 row-end-3 text-center">{{ number.label }}</span>
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
  @apply text-8xl font-bold text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%];
}

.number-container {
  @apply grid justify-center items-center h-full w-full relative;
  grid-template-rows: 80% 20%;
}
</style>