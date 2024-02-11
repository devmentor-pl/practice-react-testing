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
    const [err, setErr] = useState(false)

    function checkValue(value) {
        if(value.length <= 3)  {
            throw new Error('The field is too short!');
        }
    }

    function setUserData(field, value, error = '') {
        setUser({ ...user, [field]: { value, error } });
    }

    function handleChange(e) {
        const {name: field, value} = e.target;
        if(typeof user[field] !== 'undefined') {

            try {
                checkValue(value);
                setUserData(field, value)
            }
            catch (err) {
                setUserData(field, value, err.message)
            }
        }
    }

    function throwError() {
        throw new Error('Incorrect data!');
    }

    function handleSubmit(e) {
        e.preventDefault();

        const {tryAuth} = props;
        
        const {login, password} = e.target.elements;

        const authResp = tryAuth(login.value, password.value);
        // console.log(authResp)
        if(typeof authResp.then === 'function') { // if return Promise
            authResp.catch(() => setErr(true));
        } else if(!authResp) {
            setErr(true)
        }
    }

    if (err) {
        throwError()
    }

    const {login, password} = user;
    return (
        <form onSubmit={ handleSubmit }>
            <p>
                <label>
                    login: <input name="login" value={ login.value } onChange={e => handleChange(e)} />
                    { login.error && <strong>{ login.error }</strong> }
                </label>
            </p>
            <p>
                <label>
                    password: <input name="password" value={ password.value } onChange={e => handleChange(e)} />
                    { password.error && <strong>{ password.error }</strong> }
                </label>
            </p>
            <p><button>send</button></p>
        </form>
    );
}

export default LoginForm;
