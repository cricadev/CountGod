<template>
  <div class="overflow-hidden wrapper-countdown">
    <ColorMode class="absolute top-4 right-4"></ColorMode>

    <div ref="header" class="header">
      <div class="relative w-full h-16 flex justify-center">
        <Transition>
          <h1 v-if="!isEditing" @click="appearInput"
            class="flex items-center justify-center gap-4 text-3xl font-zen font-normal text-center absolute top-0"> {{
              title }}

          </h1>
          <input ref="input" v-else v-model="newTitle" @blur="changeTitle" @keyup.enter="changeTitle"
            class="flex items-center justify-center gap-2 text-3xl font-normal text-center bg-transparent absolute top-0 focus:outline-none"
            type="text" />
        </Transition>
      </div>
      <form @submit.prevent="createColors" class="flex flex-col  gap-2 items-center">
        <input type="color" v-model="color">
        <UButton color="gray" type="submit">Create</UButton>

      </form>



      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton color="gray" icon="i-heroicons-calendar-days-20-solid" :label="label" />
        <template #panel="{ close }">
          <DatePicker v-model="date" @close="close" />
        </template>
      </UPopover>
    </div>


    <div class="grid-numbers">
      <CountdownSegment v-for=" number  in  NewYearsCountdown " :key="number.id" :number="number" />
    </div>

  </div>
</template>
<script setup lang="ts">
import CountdownSegment from "@/components/CountdownSegment.vue";
import { onMounted } from 'vue'
const input = ref(null);
watch(input, (val) => {
  if (val) {
    val.focus()
  }
})
useHead({
  title: 'CountGod',
  meta: [

    { name: 'description', content: "Welcome to the best countdown app you'll ever find." }


  ],
})
const { date, label, computedDays, computedHours, computedMinutes, computedSeconds } = useCountdown();
const { color, createColors, computedColorFour, computedColorThree, computedColorTwo, computedColorOne, header } = useTriadColors()
const isEditing = ref(false)
const newTitle = ref("");
const title = ref("Name the ocassion you want to track");

const appearInput = () => {
  isEditing.value = true;

}
const changeTitle = () => {
  if (newTitle.value.length < 3) return;
  title.value = newTitle.value;
  isEditing.value = false;
}


const NewYearsCountdown = reactive({
  days: {
    id: 1,
    number: computedDays,
    label: "Days",
    background: computedColorOne,
  },
  hours: {
    id: 2,
    number: computedHours,
    label: "Hours",
    background: computedColorTwo,
  },
  minutes: {
    id: 3,
    number: computedMinutes,
    label: "Minutes",
    background: computedColorThree,
  },
  seconds: {
    id: 4,
    number: computedSeconds,
    label: "Seconds",
    background: computedColorFour,
  },
})
</script>
<style  scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;

}

.v-enter-to,
.v-leave-from {
  opacity: 1;

}

.wrapper-countdown {
  @apply grid grid-cols-2 w-screen h-screen;
  grid-template-rows: 30% 70%;
}

.header {
  @apply row-span-1 col-span-2 flex flex-col gap-2 justify-center items-center pt-4;
}

.grid-numbers {
  @apply grid w-full h-full grid-cols-2 col-start-1 col-end-3 row-start-2 row-end-4 place-items-center;
  grid-template-rows: 55% 45%;
}
</style>