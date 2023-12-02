import React, { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

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
	};

	const errorHandler = useErrorHandler();
	const [user, setUser] = useState(userDefault);

	function checkValue(value) {
		if (value.length <= 3) {
			throw new Error('The field is too short!');
		}
	}

	function handleChange(e) {
		const { name: field, value } = e.target;
		try {
			if (typeof user[field] !== 'undefined') {
				checkValue(value);
				setUser({ ...user, [field]: { value, error: '' } });
			}
		} catch (error) {
			setUser({ ...user, [field]: { value, error: error.message } });
		}
	}

	function throwError() {
		throw new Error('Incorrect data!');
	}

	function handleSubmit(e) {
		e.preventDefault();

		const { tryAuth, onError } = props;
		const { login, password } = e.target.elements;

		const authResp = tryAuth(login.value, password.value);
		if (typeof authResp.then === 'function') {
			authResp.catch((error) => {
				errorHandler(throwError);
				onError(error.message);
			});
		} else if (!authResp) {
			errorHandler(throwError);

			onError('Incorrect data!');// jak w tym miejscu przechwycic message funkcji ktora wyrzuca blad czyli throwError()?
		}
	}

	const { login, password } = user;
	return (
		<form onSubmit={handleSubmit}>
			<p>
				<label>
					login:{' '}
					<input
						name='login'
						value={login.value}
						onChange={(e) => handleChange(e)}
					/>
					{login.error && <strong>{login.error}</strong>}
				</label>
			</p>
			<p>
				<label>
					password:{' '}
					<input
						name='password'
						value={password.value}
						onChange={(e) => handleChange(e)}
					/>
					{password.error && <strong>{password.error}</strong>}
				</label>
			</p>
			<p>
				<button>send</button>
			</p>
		</form>
	);
}

export default LoginForm;
