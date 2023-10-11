export function useCountdown() {

  const date = ref(new Date())
  const label = computed(() => date.value.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
  )
  // initialize components based on data attribute selectors




  const now = ref(Date.now())
  let intervalId;
  watchEffect(() => {
    intervalId = setInterval(() => {
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

  return {
    date,
    label,
    computedDays,
    computedHours,
    computedMinutes,
    computedSeconds
  }
}