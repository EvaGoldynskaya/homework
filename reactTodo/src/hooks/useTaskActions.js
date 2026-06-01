import { useMemo } from "react"

//Хук для управления действиями над задачами
const useTaskActions = (tasks, setTasks) => {
	const deleteAllTasks = () => {
		const isConfirmed = confirm("Вы уверены, что хотите удалить все задачи?")

		if (isConfirmed) {
			setTasks([])
		}
	}

	const deleteTask = taskId => {
		setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId))
	}

	const toggleTaskComplete = (taskId, isDone) => {
		setTasks(currentTasks =>
			currentTasks.map(task =>
				task.id === taskId ? { ...task, isDone } : task
			)
		)
	}

	const addTask = title => {
		const trimmedTitle = title.trim()

		if (!trimmedTitle) {
			return null
		}

		const newTask = {
			id: crypto?.randomUUID() ?? Date.now().toString(),
			title: trimmedTitle,
			isDone: false,
		}

		setTasks(currentTasks => [...currentTasks, newTask])

		return newTask
	}
	
	return {
		tasks,
		addTask,
		deleteTask,
		toggleTaskComplete,
		deleteAllTasks,
	}
}

export default useTaskActions
