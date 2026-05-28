import { useCallback, useRef, useState } from "react"

// Хук для управления состоянием и поведением поля ввода
const useTaskInput = (initialValue = "") => {
	const [value, setValue] = useState(initialValue)
	const inputRef = useRef(null)

	const reset = useCallback(() => setValue(""), [])

	const focus = useCallback(() => {
		inputRef.current?.focus()
	}, [])

	return {
		value,
		setValue,
		inputRef,
		reset,
		focus,
	}
}

export default useTaskInput
