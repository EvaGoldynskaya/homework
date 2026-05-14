// Создание лепестка для кнопки
export function createPetal(index: number, total: number): HTMLSpanElement {
  const el = document.createElement('span')
  el.className = 'petal'
  const angle = (360 / total) * index
  el.style.setProperty('--angle', `${angle}deg`)
  return el
}
