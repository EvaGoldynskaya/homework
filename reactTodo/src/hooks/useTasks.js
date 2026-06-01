import { useEffect, useState } from "react"
import useTaskInput from "./useTaskInput"
import useTaskActions from "./useTaskActions"
import useTasksLocalStorage from "./useTasksLocalStorage"

//Основной хук для управления задачами и их состоянием, объединяющий логику из других хуков
const useTasks = () => {
	// Загрузка и сохранение задач в localStorage
	const { savedTasks, saveTasks } = useTasksLocalStorage()

	const [tasks, setTasks] = useState(savedTasks ?? [])

	//Действия с задачами
	const {
		addTask: addTaskToList,
		deleteAllTasks,
		deleteTask,
		toggleTaskComplete,
	} = useTaskActions(tasks, setTasks)

	//Управление формой добавления задачи
	const {
		value: newTaskTitle,
		setValue: setNewTaskTitle,
		inputRef: newTaskInputRef,
		reset: resetNewTaskTitle,
		focus: focusNewTaskInput,
		error: titleError,
		isValid: isTitleValid,
	} = useTaskInput("", {
		maxLength: 100,
		validate: (val) =>
			val != "" && val.trim() === "" ? "Task title is required" : null,
	})

	//Управление формой поиска задачи
	const {
		value: searchQuery,
		setValue: setSearchQuery,
		reset: resetSearchQuery,
	} = useTaskInput("")

	//Добавление задачи + сброс форм и фокус на поле ввода
	const addTask = () => {
		const addedTask = addTaskToList(newTaskTitle)

		if (addedTask) {
			resetNewTaskTitle()
			resetSearchQuery()
			focusNewTaskInput()
		}
	}

	useEffect(() => {
		saveTasks(tasks)
	}, [tasks, saveTasks])

	useEffect(() => {
		focusNewTaskInput()
	}, [focusNewTaskInput])

	//Оставила заполнение filteredTasks в этом хуке т.к. он зависит от searchQuery
	const normalizedSearchQuery = searchQuery.trim().toLowerCase()

	const filteredTasks =
		normalizedSearchQuery .length > 0
			? tasks.filter(({ title }) =>
					title.toLowerCase().includes(normalizedSearchQuery)
				)
			: null

	return {
		tasks,
		filteredTasks,
		deleteTask,
		toggleTaskComplete,
		deleteAllTasks,

		newTaskTitle,
		setNewTaskTitle,
		titleError,
		isTitleValid,
		searchQuery,
		setSearchQuery,
		newTaskInputRef,
		addTask,
	}
}

export default useTasks
