const Field = props => {
	const {
		className = "",
		id,
		label,
		type = "text",
		value,
		onInput,
		ref,
		error,
	} = props

	return (
		<div className={`field ${className} ${error ? "field--error" : ""}`}>
			<input
				className="field__input"
				id={id}
				placeholder={label}
				autoComplete="off"
				type={type}
				value={value}
				onInput={onInput}
				ref={ref}
				aria-invalid={!!error}
				aria-describedby={error ? `${id}-error` : undefined}
			/>
			{error && (
				<span className="field__error" id={`${id}-error`}>
					{error}
				</span>
			)}
		</div>
	)
}

export default Field
