import { createPetal } from "./petal"
import type { GradientPalette } from "./gradientPalette"

const PETAL_COUNT = 7

// Создание кнопки-цветка
export function createFlowerButton(
	palette: GradientPalette
): HTMLButtonElement {
	const btn = document.createElement("button")
	btn.type = "button"
	btn.className = "flower-btn"
	btn.setAttribute("aria-label", "Сменить фон страницы")

	//Установка цветов в переменнные
	btn.style.setProperty("--petal-light", palette.petalLight)
	btn.style.setProperty("--petal-mid", palette.petalMid)
	btn.style.setProperty("--petal-dark", palette.petalDark)
	btn.style.setProperty("--center-light", palette.centerLight)
	btn.style.setProperty("--center-mid", palette.centerMid)
	btn.style.setProperty("--center-dark", palette.centerDark)

	const flower = document.createElement("span")
	flower.className = "flower"

	//Создание лепестков
	const petals = document.createElement("span")
	petals.className = "petals"
	for (let i = 0; i < PETAL_COUNT; i++) {
		petals.appendChild(createPetal(i, PETAL_COUNT))
	}
	flower.appendChild(petals)

	//Создание центра цветка
	const center = document.createElement("span")
	center.className = "flower-center"
	flower.appendChild(center)

	btn.appendChild(flower)
	return btn
}
