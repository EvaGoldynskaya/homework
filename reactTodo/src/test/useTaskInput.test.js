import { act, renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import useTaskInput from "../hooks/useTaskInput"

describe("useTaskInput", () => {
	it("Обновление и очистка значения в поле", () => {
		const { result } = renderHook(() => useTaskInput(""))

		act(() => {
			result.current.setValue("Купить чай")
		})
		expect(result.current.value).toBe("Купить чай")

		act(() => {
			result.current.reset()
		})
		expect(result.current.value).toBe("")
	})

	it("Фокусировка на поле ввода", () => {
		const { result } = renderHook(() => useTaskInput(""))
		const input = document.createElement("input")
		const focusSpy = vi.spyOn(input, "focus").mockImplementation(() => {})

		result.current.inputRef.current = input

		act(() => {
			result.current.focus()
		})
		expect(focusSpy).toHaveBeenCalledTimes(1)
	})

	it("Валидация при вводе", () => {
		const validator = val =>
			val !== "" && val.trim() === "" ? "Field is required" : null

		const { result } = renderHook(() =>
			useTaskInput("", { validate: validator })
		)

		act(() => {
			result.current.setValue("   ")
		})
		expect(result.current.error).toBe("Field is required")
		expect(result.current.isValid).toBe(false)

		// При наличии текста или пустом значении(без пробелов) ошибки быть не должно
		act(() => {
			result.current.setValue("Пересадить цветы")
		})
		expect(result.current.error).toBeNull()
		expect(result.current.isValid).toBe(true)

		act(() => {
			result.current.setValue("")
		})
		expect(result.current.error).toBeNull()
		expect(result.current.isValid).toBe(true)
	})

	it("Максимальная длина текста", () => {
		const { result } = renderHook(() => useTaskInput("", { maxLength: 20 }))

		act(() => {
			result.current.setValue("Купить продукты")
		})
		expect(result.current.value).toBe("Купить продукты")

		act(() => {
			result.current.setValue("Купить продукты из списка")
		})
		expect(result.current.value).toBe("Купить продукты")
	})
})
