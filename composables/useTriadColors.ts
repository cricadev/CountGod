export function useTriadColors() {
  const color = ref("#7B61FF");
  const header = ref(null);
  const colorsPalettes = ref([
    [
      '#7b61ff',
      '#FFAC6E',
      '#5493FF',
      '#FFE73B',
      '#47EBFF',
    ],
    [
      '#FFCB40',
      '#4DFFC7',
      '#FF9833',
      '#47EBFF',
      '#1950FF'

    ],
    [
      '#291AFF',
      '#FF9326',
      '#0C63FF',
      '#FFDB1A',
      '#0DC6FF'
    ],
    [
      '#3EB387',
      '#4DFFBC',
      '#FF9940',
      '#1B48B3',
      '#3370FF',
    ],
    [
      '#EB0C6D',
      '#9E104E',
      '#EBE200',
      '#3453EB',
      '#152C9E'
    ],


  ])
  const createPalette = () => {
    const newColorPalette = [color.value, ...quintColors(hexToRgb(color.value))];
    if (colorsPalettes.value.length < 6) {
      colorsPalettes.value.push(newColorPalette);
    } else {
      colorsPalettes.value[colorsPalettes.value.length - 1] = newColorPalette;
    }
  };

  const colorsPalette = (id) => {
    color.value = colorsPalettes.value[id][0];
    colorsArray.value = [...colorsPalettes.value[id].slice(1)]

  }
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
    // Adjust saturation and lightness for a more appealing look.
    // s = Math.min(s * 0.85, 1);  // Reduce saturation by 15%
    //l = l > 0.5 ? Math.max(l * 0.9, 0) : Math.min(l * 1.1, 1); // Darken if too light, lighten if too dark
    let color1 = rgbToHex(...hslToRgb((h + offset) % 1, s, l));
    let color2 = rgbToHex(...hslToRgb((h + 2 * offset) % 1, s, l));
    let color3 = rgbToHex(...hslToRgb((h + 3 * offset) % 1, s, l));
    let color4 = rgbToHex(...hslToRgb((h + 4 * offset) % 1, s, l));

    return [color1, color2, color3, color4];
  }
  const colorsArray = ref([

  ])
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

  watch(colorsArray, (newVal, oldVal) => {
    if (header.value) header.value.style.background = color.value;


    computedColorOne.value;
    computedColorTwo.value;
    computedColorThree.value;
    computedColorFour.value;

  }, { deep: true });

  const createColors = () => {
    const colors = quintColors(hexToRgb(color.value));

    colorsArray.value = [...colors]
  }
  createColors()
  return {
    colorsPalettes,
    colorsPalette,
    createColors,
    color,
    computedColorOne,
    computedColorTwo,
    computedColorThree,
    computedColorFour,
    header,
    createPalette
  }
}