import Todo from "./components/Todo"
import { TaskProvider } from "./context/TaskProvider"

const App = () => {
	return (
		<TaskProvider>
			<Todo />
		</TaskProvider>
	)
}

export default App
