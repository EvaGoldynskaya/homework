//Тип для градиента кнопки
export interface GradientPalette {
	petalLight: string
	petalMid: string
	petalDark: string
	centerLight: string
	centerMid: string
	centerDark: string
	gradientStart: string
	gradientEnd: string
}

//Набор палитр для кнопок и градиента
export const palettes: GradientPalette[] = [
	{
		petalLight: "#f9d5ff",
		petalMid: "#f47bff",
		petalDark: "#b342f4",
		centerLight: "#ffe8f1",
		centerMid: "#ff9ecd",
		centerDark: "#e3548e",
		gradientStart: "#f9d5ff",
		gradientEnd: "#b342f4",
	},
	{
		petalLight: "#d0f2ff",
		petalMid: "#78d4ff",
		petalDark: "#2e9fe8",
		centerLight: "#e7fbff",
		centerMid: "#9ee9ff",
		centerDark: "#4fabd6",
		gradientStart: "#d0f2ff",
		gradientEnd: "#2e9fe8",
	},
	{
		petalLight: "#fff4c2",
		petalMid: "#ffd768",
		petalDark: "#c98c20",
		centerLight: "#fff9e2",
		centerMid: "#ffe4a9",
		centerDark: "#c7852e",
		gradientStart: "#fff4c2",
		gradientEnd: "#c98c20",
	},
	{
		petalLight: "#d4ffe5",
		petalMid: "#7be99d",
		petalDark: "#2c9f5c",
		centerLight: "#edffef",
		centerMid: "#a5f5bb",
		centerDark: "#4cb46e",
		gradientStart: "#d4ffe5",
		gradientEnd: "#2c9f5c",
	},
	{
		petalLight: "#ffe2d7",
		petalMid: "#ff9e88",
		petalDark: "#d94f3f",
		centerLight: "#fff1ec",
		centerMid: "#ffb9a9",
		centerDark: "#d3644e",
		gradientStart: "#ffe2d7",
		gradientEnd: "#d94f3f",
	},
	{
		petalLight: "#d9e4ff",
		petalMid: "#7c9eff",
		petalDark: "#3f5dcc",
		centerLight: "#edf2ff",
		centerMid: "#a5baff",
		centerDark: "#5269c7",
		gradientStart: "#d9e4ff",
		gradientEnd: "#3f5dcc",
	},
]
