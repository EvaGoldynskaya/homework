import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { TaskContext } from "../context/TaskContext"
import AddTaskForm from "../components/AddTaskForm"

describe("AddTaskForm", () => {
	it("Добавление новой задачи", () => {
		const addTask = vi.fn()

		render(
			<TaskContext.Provider
				value={{
					addTask,
					newTaskTitle: "Купить чай",
					setNewTaskTitle: vi.fn(),
					newTaskInputRef: { current: null },
					titleError: null,
					isTitleValid: true,
				}}
			>
				<AddTaskForm />
			</TaskContext.Provider>
		)

		fireEvent.submit(
			screen.getByRole("button", { name: /add/i }).closest("form")
		)
		expect(addTask).toHaveBeenCalledTimes(1)
	})
})
