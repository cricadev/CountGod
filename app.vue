<template>
  <div class="overflow-hidden wrapper-countdown">

    <div ref="header" class="header">
      <ColorPicker></ColorPicker>
      <form @submit.prevent="createColors">
        <input type="color" v-model="color">
        <UButton color="gray" type="submit">Create</UButton>

      </form>
      <Transition>
        <h1 v-if="!isEditing" class="flex items-center justify-center gap-2 text-3xl font-normal text-center"> {{ title }}
          <svg @click="appearInput" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-20 h-20">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </h1>
        <input v-else v-model="newTitle" @blur="changeTitle" @keyup.enter="changeTitle"
          class="flex items-center justify-center gap-2 text-3xl font-normal text-center" type="text" />
      </Transition>


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

const isEditing = ref(false)
const newTitle = ref("");
const color = ref("#000000");
const title = ref("Name the ocassion you want to track");
const appearInput = () => {
  isEditing.value = true;

}
const changeTitle = () => {
  if (newTitle.value.length < 3) return;
  title.value = newTitle.value;
  isEditing.value = false;
}
const date = ref(new Date())
const label = computed(() => date.value.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
)
// initialize components based on data attribute selectors


const newYearsDate = new Date("Jan 1, 2024 00:00:00")
const refNYDate = ref(newYearsDate.getTime())


const now = ref(Date.now())

watchEffect(() => {
  setInterval(() => {
    now.value = Date.now()
  }, 1000)

})

const elapsed = computed(() => {
  const nowDate = new Date(now.value);
  const selectedDate = new Date(date.value);
  const midnight = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());


  if (midnight < nowDate) {
    return;
  }

  return midnight - nowDate;
});

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




const header = ref(null)
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hslToRgb(h, s, l) {
  let r, g, b;

  if (s == 0) {
    r = g = b = l;
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function hexToRgb(hex) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse r, g, b values
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return [r, g, b];
}
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}
function quintColors(rgb) {
  let [h, s, l] = rgbToHsl(...rgb);

  let offset = 1 / 5; // Divide the hue circle by 5
  let color1 = rgbToHex(...hslToRgb((h + offset) % 1, s, l));
  let color2 = rgbToHex(...hslToRgb((h + 2 * offset) % 1, s, l));
  let color3 = rgbToHex(...hslToRgb((h + 3 * offset) % 1, s, l));
  let color4 = rgbToHex(...hslToRgb((h + 4 * offset) % 1, s, l));

  return [color1, color2, color3, color4];
}
const colorsArray = ref([

])

watch(colorsArray, (newVal, oldVal) => {
  console.log(newVal);
  header.value.style.background = color.value;
  computedColorOne.value;
  computedColorTwo.value;
  computedColorThree.value;
  computedColorFour.value;

}, { deep: true });
const computedColorOne = computed(() => {
  return colorsArray.value[0];
})
const computedColorTwo = computed(() => {
  return colorsArray.value[1];
})
const computedColorThree = computed(() => {
  return colorsArray.value[2];
})
const computedColorFour = computed(() => {
  return colorsArray.value[3];
})

const createColors = () => {
  const colors = quintColors(hexToRgb(color.value));
  console.log(colors);
  colors.forEach((color) => {
    colorsArray.value.push(color)
  })

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
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.wrapper-countdown {
  @apply grid grid-rows-3 grid-cols-2 w-screen h-screen;
}

.header {
  @apply row-span-1 col-span-2 flex flex-col justify-center items-center;
}
</style>