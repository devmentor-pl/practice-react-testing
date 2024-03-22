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
        }
    }

    const [user, setUser] = useState(userDefault);
    const [isError, setIsError] = useState(false);

    function checkValue(value) {
        if (value.length <= 3) {
            return 'The field is too short!';
        }
        return '';
    }

    function handleChange(e) {
        const { name: field, value } = e.target;
        if (typeof user[field] !== 'undefined') {
            const errorMessage = checkValue(value);
            setUserData(field, value, errorMessage);
        }
    }

    const setUserData = (field, value, error = '') => {
        setUser(prevUser => ({ ...prevUser, [field]: { value, error } }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const { tryAuth } = props;
        const { login, password } = e.target.elements;

        try {
            const authResp = await tryAuth(login.value, password.value);
            if (!authResp) {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        }
    }

    const { login, password } = user;
    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>
                    login: <input name="login" value={login.value} onChange={handleChange} />
                    {login.error && <strong>{login.error}</strong>}
                </label>
            </p>
            <p>
                <label>
                    password: <input name="password" value={password.value} onChange={handleChange} />
                    {password.error && <strong>{password.error}</strong>}
                </label>
            </p>
            {isError && <p>Incorrect data or authentication failed.</p>}
            <p><button type="submit">send</button></p>
        </form>
    );
}

export default LoginForm;
