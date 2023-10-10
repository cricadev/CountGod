<template>
  <div class="overflow-hidden wrapper-countdown">

    <div class="header bg-primary">
      <ColorPicker></ColorPicker>
      <h1 class="flex items-center justify-center gap-2 text-3xl font-normal text-center"> {{ title }}
        <svg @click="appearInput" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="currentColor" class="w-20 h-20">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </h1>
      <UButton color="gray" variant="ghost" square>
        <UIcon name="i-heroicons-pencil-square-20-solid" class="w-5 h-5 text-primary-500 dark:text-primary-400" />
      </UButton>
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton icon="i-heroicons-calendar-days-20-solid" :label="label" />
        <template #panel="{ close }">
          <DatePicker v-model="date" @close="close" />
        </template>
      </UPopover>
    </div>


    <div
      class="grid w-full h-full grid-cols-2 col-start-1 col-end-3 grid-rows-2 row-start-2 row-end-4 place-items-center">
      <CountdownSegment v-for=" number  in  NewYearsCountdown " :key="number.id" :number="number" />
    </div>

  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import CountdownSegment from "@/components/CountdownSegment.vue";
import { onMounted } from 'vue'
const newTitle = ref("");
const title = ref("Name the ocassion you want to track");

const changeTitle = () => {
  if (newTitle.value.length < 3) return;
  title.value = newTitle.value;
}
const date = ref(new Date())
const label = computed(() => date.value.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
)
// initialize components based on data attribute selectors


const newYearsDate = new Date("Jan 1, 2024 00:00:00")
const now = ref(Date.now());
const refNYDate = ref(newYearsDate.getTime())
const currentDate = ref(new Date());

setInterval(() => {
  currentDate.value = Date.now();
}, 1000);

const elapsed = computed(() => {
  return date.value - currentDate.value;
})

const computedSeconds = computed(() => {
  return Math.floor((elapsed.value / 1000) % 60);
})
const computedMinutes = computed(() => {
  return Math.floor((elapsed.value / 1000 / 60) % 60);
})
const computedHours = computed(() => {
  return Math.floor((elapsed.value / (1000 * 60 * 60)) % 24);
})
const computedDays = computed(() => {
  return Math.floor(elapsed.value / (1000 * 60 * 60 * 24));
})







const NewYearsCountdown = reactive({
  days: {
    id: 1,
    number: computedDays,
    label: "Days",
    background: "bg-primary",
  },
  hours: {
    id: 2,
    number: computedHours,
    label: "Hours",
    background: "bg-gray",
  },
  minutes: {
    id: 3,
    number: computedMinutes,
    label: "Minutes",
    background: "bg-primary",
  },
  seconds: {
    id: 4,
    number: computedSeconds,
    label: "Seconds",
    background: "bg-primary",
  },
})
</script>
<style  scoped>
.wrapper-countdown {
  @apply grid grid-rows-3 grid-cols-2 w-screen h-screen;
}

.header {
  @apply row-span-1 col-span-2 flex flex-col justify-center items-center;
}
</style>