import type { GradientPalette } from "./gradientPalette";

//Получение случайного направления для градиента
function getRandomDirection(): string {
  const directions = [
    'top left',
    'top right',
    'bottom left',
    'bottom right',
    'right bottom',
    'right top',
    'left bottom',
    'left top',
  ]
  return directions[Math.floor(Math.random() * directions.length)]
}

//Ограничение значения в диапазоне
function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

//Преобразование HEX в RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace('#', '')
  const value = normalized.length === 3
    ? normalized.split('').map((digit) => digit + digit).join('')
    : normalized

  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)

  return { r, g, b }
}

//Преобразование RGB в HSL
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rr = r / 255
  const gg = g / 255
  const bb = b / 255
  const max = Math.max(rr, gg, bb)
  const min = Math.min(rr, gg, bb)
  const delta = max - min

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1))

    switch (max) {
      case rr:
        h = ((gg - bb) / delta) % 6
        break
      case gg:
        h = (bb - rr) / delta + 2
        break
      case bb:
        h = (rr - gg) / delta + 4
        break
    }

    h = 60 * h
    if (h < 0) h += 360
  }

  return { h, s, l }
}

//Преобразование HSL в HEX
function hslToHex(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let rr = 0
  let gg = 0
  let bb = 0

  if (h >= 0 && h < 60) {
    rr = c; gg = x; bb = 0
  } else if (h >= 60 && h < 120) {
    rr = x; gg = c; bb = 0
  } else if (h >= 120 && h < 180) {
    rr = 0; gg = c; bb = x
  } else if (h >= 180 && h < 240) {
    rr = 0; gg = x; bb = c
  } else if (h >= 240 && h < 300) {
    rr = x; gg = 0; bb = c
  } else {
    rr = c; gg = 0; bb = x
  }

  const r = Math.round((rr + m) * 255)
  const g = Math.round((gg + m) * 255)
  const b = Math.round((bb + m) * 255)

  const toHex = (value: number) => value.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

//Генерация цвета 
function getColorVariant(hex: string, hueShift: number, satShift: number, lightShift: number): string {
  const { r, g, b } = hexToRgb(hex)
  const { h, s, l } = rgbToHsl(r, g, b)
  //Еще одно смещение для более разнообразных градиентов
  const shiftedHue = (h + hueShift + 360) % 360
  const shiftedSat = clamp(s + satShift, 0, 1)
  const shiftedLight = clamp(l + lightShift, 0, 1)
  return hslToHex(shiftedHue, shiftedSat, shiftedLight)
}

//Генерация случайного числа в диапазоне
function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

//Выбор базовых цветов и генерация 
function chooseGradientColors(palette: GradientPalette): [string, string] {

  //Выбор случайных цветов из базовой палитны
  const startBaseColors = [palette.gradientStart, palette.petalMid, palette.centerMid]
  const endBaseColors = [palette.gradientEnd, palette.petalDark, palette.centerDark]
  const startBase = startBaseColors[Math.floor(Math.random() * startBaseColors.length)]
  const endBase = endBaseColors[Math.floor(Math.random() * endBaseColors.length)]
  //Генерация смещения яркости, насыщенности и оттенка
  const hueShift = randomRange(-14, 14)
  const satShift = randomRange(-0.16, 0.16)
  const lightShift = randomRange(-0.16, 0.16)
  //Генерация итоговых цветов
  const start = getColorVariant(startBase, hueShift, satShift, lightShift)
  const end = getColorVariant(endBase, hueShift * 0.7, satShift * 0.8, lightShift * 0.65)

  return start === end ? [startBase, end] : [start, end]
}

//Генерация градиента на основе палитры
export function getGradientFromPalette(palette: GradientPalette): string {
  const direction = getRandomDirection()
  const [startColor, endColor] = chooseGradientColors(palette)
  return `linear-gradient(to ${direction}, ${startColor}, ${endColor})`
}
