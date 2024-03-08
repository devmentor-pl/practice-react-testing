import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
// import CatchError from './components/CatchError';

const Task01 = () => {
	const [hasError, setHasError] = useState(false)

	function tryAuth(login, password) {
		return login.length + password.length > 6
	}

	function handleError() {
		setHasError(true)
	}

	if (hasError) {
		throw new Error('Error occurred during form submission')
	}

	return (
		<section>
			<h1>Task01</h1>
			<LoginForm tryAuth={tryAuth} onError={handleError} />
		</section>
	)
}

export default Task01
