import React, { useState } from "react";

function CreditCardForm(props) {
  const userDefault = {
    firstName: {
      value: "",
    },
    surname: {
      value: "",
    },
    cardNumber: {
      value: "",
      error: "",
    },
    expirationDate: {
      value: "",
    },
  };

  const [user, setUser] = useState(userDefault);
  const [creditCardType, setCreditCardType] = useState("");

  function checkCardNumber(value) {
    if (value.length >= 13 && value.length <= 16) {
      let newNum = value.padStart(16, "0");
      let sum = 0;
      let newSum = 0;
      for (let i = 0; i < newNum.length; i++) {
        if (i === 0) {
          sum = (parseInt(newNum[i]) * 2).toString();
        } else if (i % 2 === 0) {
          sum = sum + (parseInt(newNum[i]) * 2).toString();
        } else {
          sum = sum + (parseInt(newNum[i]) * 1).toString();
        }
      }
      for (let j = 0; j < sum.length; j++) {
        newSum = newSum + parseInt(sum[j]);
      }
      let newSumStr = newSum.toString();
      if (newSumStr.charAt(newSumStr.length - 1) !== "0") {
        throw new Error("Wrong card number!");
      } else {
        console.log("Correct number!");
      }
    }
  }

  function handleChange(e) {
    const { name: field, value } = e.target;
    let error = "";
    if (typeof user[field] !== "undefined") {
      try {
        checkCardNumber(value);
      } catch (err) {
        error = err.message;
      }
      setUser({ ...user, [field]: { value, error } });
    }
    setCreditCardType("");
  }

  function CreditCardTypeCheck() {
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
      setCreditCardType("Card number do not match any type!");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
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
