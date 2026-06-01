import { TaskContext } from "./TaskContext"
import useTasks from "../hooks/useTasks"

export const TaskProvider = props => {
	const { children } = props

	const {
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
	} = useTasks()

	return (
		<TaskContext.Provider
			value={{
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
			}}
		>
			{children}
		</TaskContext.Provider>
	)
}
