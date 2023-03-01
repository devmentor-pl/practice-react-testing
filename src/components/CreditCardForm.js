import React, { useState } from "react";

function CreditCardForm() {
  const userDefault = {
    name: {
      value: "",
      error: "",
    },
    surname: {
      value: "",
      error: "",
    },
    cardNumber: {
      value: "",
      error: "",
    },
    expirationDate: {
      value: "",
      error: "",
    },
  };

  const [user, setUser] = useState(userDefault);
  const [err, setErr] = useState("");

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

export default CreditCardForm;
