import React, { useState } from 'react';

function LoginForm(props) {
  const userDefault = {
    login: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  };

  const [user, setUser] = useState(userDefault);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function checkValue(value) {
    if (value.length <= 3) {
      throw new Error("The field is too short!");
    }
  }

  function handleChange(e) {
    const { name: field, value } = e.target;
    if (typeof user[field] !== "undefined") {
      try {
        checkValue(value);
        setUser({ ...user, [field]: { value, error: "" } });
      } catch (err) {
        setUser({ ...user, [field]: { value, error: err.message } });
      }
    }
  }

  function throwError() {
    setHasError(true);
    setErrorMessage("Wprowadziłeś niepoprawne dane!");
    // z tego co rozumiem, żeby użyć .getDerivedStateFromError() musiałbym cały komponent przerobić na klasowy (próbowałem to zrobić za pomocą komponentu CatchError, ale tak jak dokumentacja Reacta mówi to nie zadziała przy event handlerach, dlatego zrobiłem w ten sposób)
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { tryAuth } = props;
    const { login, password } = e.target.elements;

    const authResp = tryAuth(login.value, password.value);
    if (typeof authResp === "function") {
      // if return Promise
      authResp.catch(() => throwError());
    } else if (!authResp) {
      throwError();
    }
  }

  const { login, password } = user;

  if (hasError && errorMessage) {
    return <h1>{errorMessage}</h1>;
  }

  return (
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            login:{" "}
            <input
              name="login"
              value={login.value}
              onChange={(e) => handleChange(e)}
            />
            {login.error && <strong>{login.error}</strong>}
          </label>
        </p>
        <p>
          <label>
            password:{" "}
            <input
              name="password"
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
