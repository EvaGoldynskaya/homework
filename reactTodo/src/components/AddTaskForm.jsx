import Field from "./Field"
import Button from "./Button"
import { useContext } from "react"
import { TaskContext } from "../context/TaskContext"

const AddTaskForm = () => {
	const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
		useContext(TaskContext)

	const onSubmit = event => {
		event.preventDefault()
		addTask()
	}

	return (
		<form className="todo__form" onSubmit={onSubmit}>
			<Field
				className="todo__field"
				label="New task title"
				id="new-task"
				value={newTaskTitle}
				onInput={e => setNewTaskTitle(e.target.value)}
				ref={newTaskInputRef}
			/>
			<Button type="submit">Add</Button>
		</form>
	)
}

export default AddTaskForm
