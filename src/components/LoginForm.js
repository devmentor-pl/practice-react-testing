import React, { useState } from 'react';


function LoginForm(props) {
	const userDefault = {
		login: {
			value: '',
			error: '',
		},
		password: {
			value: '',
			error: '',
		},
	}

	const [user, setUser] = useState(userDefault)

	function checkValue(value) {
		if (value.length <= 3) {
			throw new Error('The field is too short!')
		}
	}

	function handleChange(e) {
		const { name: field, value } = e.target
		if (typeof user[field] !== 'undefined') {
			try {
				checkValue(value)
			} catch (err) {
				console.log(err.message)
			}
			setUser({ ...user, [field]: { value, error: '' } })
		}
	}

	function throwError() {
		throw new Error('Incorrect data!')
	}
	function handleSubmit(e) {
		e.preventDefault()

		// starszne zamieszanie tutaj się zrobiło
		try {
			const { tryAuth } = props
			const { login, password } = e.target.elements

			const authResp = tryAuth(login.value, password.value)
			if (!authResp) throwError()
		} catch (err) {
			props.onError()
		}
	}

	const { login, password } = user
	return (
		<form onSubmit={handleSubmit}>
			<p>
				<label>
					login: <input name="login" value={login.value} onChange={e => handleChange(e)} />
					{login.error && <strong>{login.error}</strong>}
				</label>
			</p>
			<p>
				<label>
					password: <input name="password" value={password.value} onChange={e => handleChange(e)} />
					{password.error && <strong>{password.error}</strong>}
				</label>
			</p>
			<p>
				<button>send</button>
			</p>
		</form>
	)
}

export default LoginForm;
