import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import useTaskActions from "../hooks/useTaskActions"

describe("useTaskActions", () => {
	const initialTasks = [
		{ id: "1", title: "Задача1", isDone: false },
		{ id: "2", title: "Задача2", isDone: true },
	]

	let setTasks

	beforeEach(() => {
		setTasks = vi.fn()
	})

	it("Добавление задачи с не пустым описанием", () => {
		const { result } = renderHook(() => useTaskActions([], setTasks))
		const newTask = result.current.addTask("   Купить чай   ")

		expect(newTask).toMatchObject({
			title: "Купить чай",
			isDone: false,
		})
		expect(typeof newTask.id).toBe("string")
		expect(setTasks).toHaveBeenCalledTimes(1)
	})

	it("Попытка добавить задачу с пустым описанием", () => {
		const { result } = renderHook(() => useTaskActions([], setTasks))

		expect(result.current.addTask("   ")).toBeNull()
		expect(setTasks).not.toHaveBeenCalled()
	})

	it("Удаление задачи по id", () => {
		const { result } = renderHook(() => useTaskActions(initialTasks, setTasks))

		act(() => {
			result.current.deleteTask("1")
		})

		expect(setTasks).toHaveBeenCalledWith(expect.any(Function))
	})

	it("Завершение задачи", () => {
		const { result } = renderHook(() => useTaskActions(initialTasks, setTasks))

		act(() => {
			result.current.toggleTaskComplete("1", true)
		})

		expect(setTasks).toHaveBeenCalledWith(expect.any(Function))
	})

	it("Удаление всех задач после подтверждения", () => {
		const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false)
		const { result } = renderHook(() => useTaskActions(initialTasks, setTasks))

		act(() => {
			result.current.deleteAllTasks()
		})

		expect(confirmSpy).toHaveBeenCalledTimes(1)
		expect(setTasks).not.toHaveBeenCalled()

		confirmSpy.mockRestore()
	})
})
