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

  const wrongInputValueStyle = {
    display: 'none',
  };
  const correctInputValueStyle = {
    display: 'block',
  };

  const [user, setUser] = useState(userDefault);

  function checkValue(value) {
    if (value.length <= 3) {
      throw new Error('The field is too short!');
    }
  }

  function handleChange(e) {
    const { name: field, value } = e.target;
    if (typeof user[field] !== 'undefined') {
      try {
        checkValue(value);
        setUser({ ...user, [field]: { value, error: '' } });
      } catch (err) {
        setUser({ ...user, [field]: { value, error: err.message } });
      }
    }
  }

  const [hasError, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const { tryAuth } = props;
    const { login, password } = e.target.elements;

    const authResp = tryAuth(login.value, password.value);
    if (typeof authResp.then === 'function') {
      // if return Promise
      authResp.catch(() => setError(true));
    }
    if (!authResp) {
      setError(true);
    }
    if (authResp) {
      setError(false);
    }
  }

  const { login, password } = user;
  return (
    <>
      <form
        style={hasError ? wrongInputValueStyle : correctInputValueStyle}
        onSubmit={handleSubmit}
      >
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
      <h1 style={hasError ? correctInputValueStyle : wrongInputValueStyle}>
        Something went wrong :/{' '}
      </h1>
    </>
  );
}

export default LoginForm;
