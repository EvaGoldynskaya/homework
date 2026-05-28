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
})
