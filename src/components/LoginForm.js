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
	};

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

		const { tryAuth } = props;
		const { login, password } = e.target.elements;

		const authResp = tryAuth(login.value, password.value);
		if (typeof authResp.then === 'function') {
			authResp.catch(() => throwError());
		} else if (!authResp) {
			throwError();
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
// import React from 'react';

// class LoginForm extends React.Component {
// 	state = {
// 		user: {
// 			login: {
// 				value: '',
// 				error: '',
// 			},
// 			password: {
// 				value: '',
// 				error: '',
// 			},
// 		},
// 		formError: null,
// 	};

// 	static getDerivedStateFromError(error) {
// 		console.log(`i tak zadnego bledu nie przechytuje...`);
// 		return { formError: error.message };
// 	}

// 	checkValue(value) {
// 		if (value.length <= 3) {
// 			throw new Error('The field is too short!');
// 		}
// 	}

// 	handleChange = (e) => {
// 		const { name: field, value } = e.target;
// 		try {
// 			if (typeof this.state.user[field] !== 'undefined') {
// 				this.checkValue(value);
// 				this.setState({
// 					user: { ...this.state.user, [field]: { value, error: '' } },
// 					formError: null,
// 				});
// 			}
// 		} catch (error) {
// 			this.setState({
// 				user: { ...this.state.user, [field]: { value, error: error.message } },
// 				formError: null,
// 			});
// 		}
// 	};

// 	throwError() {
// 		throw new Error('Incorrect data!');
// 	}

// 	handleSubmit = (e) => {
// 		e.preventDefault();

// 		const { tryAuth } = this.props;
// 		const { login, password } = e.target.elements;

// 		const authResp = tryAuth(login.value, password.value);
// 		if (typeof authResp.then === 'function') {
// 			authResp.catch(() => this.throwError());
// 		} else if (!authResp) {
// 			this.throwError();
// 		}
// 	};

// 	render() {
// 		const { login, password } = this.state.user;

// 		if (this.state.formError) {
// 			return <h1>{this.state.formError}</h1>;
// 		}

// 		return (
// 			<form onSubmit={this.handleSubmit}>
// 				<p>
// 					<label>
// 						login:{' '}
// 						<input
// 							name='login'
// 							value={login.value}
// 							onChange={(e) => this.handleChange(e)}
// 						/>
// 						{login.error && <strong>{login.error}</strong>}
// 					</label>
// 				</p>
// 				<p>
// 					<label>
// 						password:{' '}
// 						<input
// 							name='password'
// 							value={password.value}
// 							onChange={(e) => this.handleChange(e)}
// 						/>
// 						{password.error && <strong>{password.error}</strong>}
// 					</label>
// 				</p>
// 				<p>
// 					<button>send</button>
// 				</p>
// 			</form>
// 		);
// 	}
// }

// export default LoginForm;
