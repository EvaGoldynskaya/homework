const Button = props => {
	const { className = "", type = "button", children, disabled = false } = props

	return (
		<button className={`button ${className}`} type={type} disabled={disabled}>
			{children}
		</button>
	)
}

export default Button
