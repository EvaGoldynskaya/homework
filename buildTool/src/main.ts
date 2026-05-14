import './styles/style.scss'
import { createFlowerButton } from './components/flower'
import { getGradientFromPalette } from './components/gradient'
import { palettes, type GradientPalette } from './components/gradientPalette'

const appRoot = document.querySelector<HTMLDivElement>('#app')
if (!appRoot) throw new Error('#app not found')

appRoot.className = 'app-root'

//Получение и применение градиента
function applyBackgroundFromPalette(palette: GradientPalette, node: HTMLDivElement): void {
  node.style.backgroundImage = getGradientFromPalette(palette)
}

//Запуск анимации цветка
function playFlowerSpin(btn: HTMLButtonElement): void {
  btn.classList.remove('flower-btn--spin')
  void btn.offsetWidth
  btn.classList.add('flower-btn--spin')
}

//Установка начального фона
applyBackgroundFromPalette(palettes[0], appRoot)

//Создание элеммента-контейнера для кнопок
const flowerRow = document.createElement('div')
flowerRow.className = 'flower-row'
appRoot.appendChild(flowerRow)

//Создание самих кнопок и listener-ов для них
palettes.forEach((palette) => {
  const btn = createFlowerButton(palette)

  btn.addEventListener('animationend', (ev) => {
    if (ev.animationName === 'flower-spin') {
      btn.classList.remove('flower-btn--spin')
    }
  })

  btn.addEventListener('click', () => {
    applyBackgroundFromPalette(palette, appRoot)
    playFlowerSpin(btn)
  })

  flowerRow.appendChild(btn)
})
