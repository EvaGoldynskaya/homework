import { useCallback, useRef, useState } from "react"

// Хок для управления состоянием и поведением поля ввода
const useTaskInput = (initialValue = "", validateOptions = {}) => {
	const { validate, maxLength = 100 } = validateOptions
	const [value, setValue] = useState(initialValue)
	const [error, setError] = useState(null)
	const inputRef = useRef(null)

	const reset = useCallback(() => {
		setValue("")
		setError(null)
	}, [])

	const focus = useCallback(() => {
		inputRef.current?.focus()
	}, [])

	//Валидация вводимого значения при необходимости + ограничение по длине ввода
	const handleChange = useCallback(
		(newValue) => {
			if (newValue.length > maxLength) return

			setValue(newValue)

			if (validate) {
				const validationError = validate(newValue)
				setError(validationError)
			}
		}, [validate, maxLength]
	)

	return {
		value,
		setValue: handleChange,
		inputRef,
		reset,
		focus,
		error,
		isValid: !error,
	}
}

export default useTaskInput
