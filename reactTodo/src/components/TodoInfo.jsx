import { useContext } from "react"
import { TaskContext } from "../context/taskContext"

const TodoInfo = () => {
	const { tasks, deleteAllTasks } = useContext(TaskContext)

	const total = tasks.length
	const done = tasks.filter(({ isDone }) => isDone).length
	const hasTasks = total > 0

	return (
		<div className="todo__info">
			<div className="todo__total-tasks">
				Done {done} from {total}
			</div>
			{hasTasks && (
				<button
					className="todo__delete-all-button"
					type="button"
					onClick={deleteAllTasks}
				>
					Delete all
				</button>
			)}
		</div>
	)
}

export default TodoInfo
