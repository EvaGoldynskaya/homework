import { useContext } from "react"
import TodoItem from "./TodoItem"
import { TaskContext } from "../context/taskContext"

const TodoList = () => {
	const { tasks, filteredTasks } = useContext(TaskContext)

	const hasTasks = tasks.length > 0
	const filteredEmpty = filteredTasks?.length === 0

	if (!hasTasks) {
		return <div className="todo__empty-message">Нет задач</div>
	}

	if (hasTasks && filteredEmpty) {
		return <div className="todo__empty-message">Задачи не найдены</div>
	}

	return (
		<ul className="todo__list">
			{(filteredTasks ?? tasks).map(task => (
				<TodoItem className="todo__item" key={task.id} {...task} />
			))}
		</ul>
	)
}

export default TodoList
