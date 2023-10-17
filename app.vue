<template>
  <div class="overflow-hidden wrapper-countdown">

    <div ref="header" class="header h-full">

      <div class="relative w-full h-16 flex justify-center col-start-1 col-end-3">
        <Transition>
          <h1 v-if="!isEditing" @click="appearInput"
            class="flex items-center  gap-4 text-3xl font-zenDots font-normal text-center lg:justify-start lg:items-start lg:text-start absolute top-0 text-white dark:text-white 2xl:text-7xl w-full justify-center lg:text-5xl">
            {{
              title }}

          </h1>
          <input ref="input" v-else v-model="newTitle" @blur="changeTitle" @keyup.enter="changeTitle"
            class="flex items-center lg:justify-start  gap-4 text-3xl font-normal text-center lg:text-start bg-transparent absolute top-0 focus:outline-none font-zenDots  w-full justify-center 2xl:text-7xl lg:text-5xl"
            type="text" />
        </Transition>
      </div>
      <div class="row-start-3 row-end-5 col-start-1 col-end-3 colors-palettes flex gap-1 relative">
        <div :class="{
          'border-white scale-110': selected[index],
          'border-transparent': !selected[index]
        }"
          class="w-12 h-12 rounded-full  grid grid-cols-2 grid-rows-2 overflow-hidden relative hover:scale-110 hover:border-2 lg:hover:scale-125 lg:hover:border-4 hover:border-white transition-all duration-200 border-2 lg:border-4 border-transparent"
          :id="'color-palette--' + index" @click="handleSelectionCreate(index)" v-for="(item, index) in colorsPalettes">
          <div class="color-palette" :style="'background:' + i" :id="'color--' + ind" v-for="(i, ind) in item">

          </div>
        </div>
        <label for="color" class="border-2 text-base w-12 h-12 bg-transparent rounded-full grid place-items-center">
          <svg v-if="colorsPalettes.length < 6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff"
            class="w-6 h-6 ">
            <path fill-rule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clip-rule="evenodd" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>

        </label>
        <input type="color" v-model="color" id="color" @input="handlePaletteCreation"
          class="opacity-0 pointer-events-none absolute top-0 right-0">
      </div>

      <div class="flex gap-4 row-start-4 row-end-5 col-start-1 col-end-3 ">

        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton color="primary" class=" text-base tracking-wider" icon="i-heroicons-calendar-days-20-solid"
            :label="label" />

          <template #panel="{ close }">
            <DatePicker v-model="date" @close="close" />
          </template>

        </UPopover>
        <UButton color="primary" variant="ghost" icon="i-heroicons-sparkles-20-solid" class=" text-base tracking-wider "
          label="Random date" @click="selectRandomDate" />
      </div>
    </div>


    <div class="grid-numbers">
      <CountdownSegment v-for="number in NewYearsCountdown" :key="number.id" :number="number" />
    </div>

  </div>
</template>
<script setup lang="ts">
import CountdownSegment from "@/components/CountdownSegment.vue";
import { select } from "@nuxt/ui";
const input = ref(null);
const selected = ref([
  false,
  false,
  false,
  false,
  false,
  false,
]);
onMounted(() => {
  selected.value[0] = true;
})
const handleSelection = (ind) => {
  selected.value[ind] = true;
  selected.value.find((item, index) => {
    if (index === ind) return;
    selected.value[index] = false;
  })

}
const handleSelectionCreate = (ind) => {
  handleSelection(ind);
  colorsPalette(ind)
}
const handlePaletteCreation = () => {
  handleSelection(5);
  createPalette();
  createColors();
}
defineEmits(['create-palette'])
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
const { date, label, computedDays, computedHours, computedMinutes, computedSeconds, isEditing, appearInput, changeTitle, newTitle, title, selectRandomDate } = useCountdown();
const { colorsPalettes, colorsPalette, color, createColors, computedColorFour, computedColorThree, computedColorTwo, computedColorOne, header, createPalette } = useTriadColors()

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
<style >
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
  @apply grid grid-cols-2 w-screen h-screen lg:grid-cols-3 lg:grid-rows-2;
  grid-template-rows: 30% 70%;

  @media (min-width: 1024px) {
    grid-template-rows: 50% 50%;
    grid-template-columns: 50% 50%;


  }
}

.header {
  @apply row-start-1 row-end-auto col-span-2 flex flex-col gap-8 justify-center items-center lg:col-span-3 lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2 lg:items-start lg:grid lg:grid-rows-4 lg:grid-cols-2 lg:p-8 2xl:p-12;
}

.grid-numbers {
  @apply grid w-full h-full grid-cols-2 col-start-1 col-end-3 row-start-2 row-end-4 place-items-center lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-3 lg:place-items-start lg:grid-cols-4 lg:grid-rows-4 pointer-events-none;
  grid-template-rows: 55% 45%;

  @media (min-width: 1024px) {
    grid-template-rows: 50% 50%;
    grid-template-columns: 25% 25% 25% 25%;
  }
}


#number--1 {
  @apply lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2;
}

#number--2 {
  @apply lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-2;
}

#number--3,
#number--4 {
  @apply lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3 lg:grid lg:h-full lg:w-full;

  @media (min-width: 1024px) {
    grid-template-rows: 100%;
    grid-template-columns: 60% 40%;
  }
}

#number--3 .number-label {
  @apply lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 lg:text-9xl xl:text-[10rem] 2xl:text-[15rem] lg:leading-[0.8] 3xl:text-[19rem] lg:relative;
  word-break: break-all;
  hyphens: auto;
}

#number--4 .number-label {
  @apply lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 xl:text-[10rem] 2xl:text-[14rem] lg:leading-[0.8] 3xl:text-[19rem] lg:relative;
  word-break: break-all;
  hyphens: auto;
}

#number--3 .number-label::before,
#number--4 .number-label::before {
  @media (min-width: 1024px) {

    content: "-";
    display: inline-block;
    white-space: pre-wrap;
    float: right;
  }

}

#number--3 .number,
#number--4 .number {
  @apply lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2 lg:text-[20rem] xl:text-[22rem] 2xl:text-[30rem] self-end 3xl:text-[35rem];
}





#number--4 {
  @apply lg:col-start-3 lg:col-end-5 lg:row-start-2 lg:row-end-3;
}

.color-palette {
  @apply h-full w-full;
}

#color--0 {
  @apply rounded-b-full col-start-1 col-end-3 row-start-2 row-end-3;
}

#color--1 {
  @apply col-start-1 col-end-2 row-start-1 row-end-2 absolute h-1/2 bottom-0 left-0;
}

#color--2 {
  @apply top-0 left-0 absolute col-start-1 col-end-2 row-start-1 row-end-2 h-1/2;
}

#color--3 {
  @apply rounded-tr-full col-start-2 col-end-3 row-start-1 row-end-2 top-0 right-0 absolute h-1/2;
}

#color--4 {
  @apply col-start-2 col-end-3 row-start-1 row-end-2 bottom-0 right-0 absolute h-1/2;
}
</style>