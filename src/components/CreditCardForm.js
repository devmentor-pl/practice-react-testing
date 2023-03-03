import React, { useState } from "react";

function CreditCardForm(props) {
  const userDefault = {
    firstName: {
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
  const [creditCardType, setCreditCardType] = useState("");
  const [err, setErr] = useState("");

  function handleChange(e) {
    const { name: field, value } = e.target;
    setUser({ ...user, [field]: { value } });
    setCreditCardType("");
  }

  function CreditCardTypeCheck() {
    console.log(cardNumber.value.charAt(0));
    console.log(cardNumber.value.length);
    if (cardNumber.value.length === 16 && cardNumber.value.charAt(0) === "5") {
      setCreditCardType("MasterCard");
    } else if (
      cardNumber.value.length === 15 &&
      cardNumber.value.charAt(0) === "3"
    ) {
      setCreditCardType("AmericanExpress");
    } else if (
      cardNumber.value.charAt(0) === "4" &&
      (cardNumber.value.length === 13 || cardNumber.value.length === 16)
    ) {
      setCreditCardType("Visa");
    } else {
      setCreditCardType("Błędny numer karty!");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(cardNumber.value);
    CreditCardTypeCheck();
  }

  const { firstName, surname, cardNumber, expirationDate } = user;
  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>
          name:{" "}
          <input
            name="firstName"
            value={firstName.value}
            onChange={(e) => handleChange(e)}
          />
          {firstName.error && <strong>{firstName.error}</strong>}
        </label>
      </p>
      <p>
        <label>
          surname:{" "}
          <input
            name="surname"
            value={surname.value}
            onChange={(e) => handleChange(e)}
          />
          {surname.error && <strong>{surname.error}</strong>}
        </label>
      </p>
      <p>
        <label>
          cardNumber:{" "}
          <input
            name="cardNumber"
            value={cardNumber.value}
            onChange={(e) => handleChange(e)}
          />
          {cardNumber.error && <strong>{cardNumber.error}</strong>}
        </label>
      </p>
      <p>
        <label>
          expirationDate:{" "}
          <input
            name="expirationDate"
            value={expirationDate.value}
            onChange={(e) => handleChange(e)}
          />
          {expirationDate.error && <strong>{expirationDate.error}</strong>}
        </label>
      </p>
      <p>
        <button>send</button>
      </p>
      <label>
        credit card type:
        <p>{creditCardType}</p>
      </label>
    </form>
  );
}

export default CreditCardForm;
