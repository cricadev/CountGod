export function useCountdown() {
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



  const date = ref('Pick a date')

  const label = computed(() => typeof date.value === 'string' ? date.value : date.value.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
  )
  // initialize components based on data attribute selectors
  const currentYear = new Date().getFullYear();

  const randomDates = [
    {
      "Wooo, Halloween!": new Date(`${currentYear}-10-31`)
    },
    {
      'Christmas is coming!': new Date(`${currentYear}-12-25`)
    },

    {
      'Valentine\'s Day vibes!': new Date(`${currentYear}-02-14`)
    },
    {
      'Happy Easter!': new Date(`${currentYear}-04-04`) // This is just a generic date. Easter date changes every year.
    },
    {
      'Happy Independence Day (US)!': new Date(`${currentYear}-07-04`)
    },
    {
      'Happy Diwali!': new Date(`${currentYear}-11-04`) // Diwali dates change every year based on the lunar calendar.
    },
    {
      'Happy Hanukkah!': new Date(`${currentYear}-11-29`) // Hanukkah dates change every year based on the lunar calendar.
    },
    {
      'Eid Mubarak!': new Date(`${currentYear}-05-13`) // Eid al-Fitr dates change every year based on the lunar calendar.
    },
    {
      'Happy Thanksgiving (US)!': new Date(`${currentYear}-11-25`) // Fourth Thursday of November
    },
  ];

  randomDates.forEach((dateObj) => {
    const date = Object.values(dateObj)[0];
    if (date < new Date()) {
      date.setFullYear(currentYear + 1);
    }
  });



  const selectRandomDate = () => {
    const randomDateDoesntRepeatThePreviousOne = () => {
      const randomDate = randomDates[Math.floor(Math.random() * randomDates.length)];
      const randomDateKey = Object.keys(randomDate)[0];
      if (randomDateKey === title.value) {
        return randomDateDoesntRepeatThePreviousOne();
      }
      return randomDate;
    }
    const randomDate = randomDateDoesntRepeatThePreviousOne();

    const randomDateKey = Object.keys(randomDate)[0];
    const randomDateValue = randomDate[randomDateKey];
    date.value = randomDateValue;
    title.value = randomDateKey;
  }
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
    selectRandomDate,
    isEditing,
    newTitle,
    title,
    appearInput,
    changeTitle,
    date,
    label,
    computedDays,
    computedHours,
    computedMinutes,
    computedSeconds,

  }
}