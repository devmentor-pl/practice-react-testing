import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import CatchError from './CatchError';

const Task01 = () => {
	const [msg, setMsg] = useState('');
	function tryAuth(login, password) {
		return login.length + password.length > 6;
	}
	const handleError = (msg) => {
		setMsg(msg);
	};
	return (
		<section>
			<h1>Task01</h1>
			<CatchError errorMessage={msg}>
				<LoginForm
					tryAuth={tryAuth}
					onError={handleError}
				/>
			</CatchError>
		</section>
	);
};

export default Task01;
