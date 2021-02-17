import React, { useState } from "react";
import { getCardNumberType, isCardNumberValid } from "../creditcard";

function CreditCardInput() {
  const [number, setNumber] = useState("");
  const [isCardValid, setIsCardValid] = useState(false);
  const [cardType, setCardType] = useState(null);

  const handleChange = e => {
    const cardNumber = e.target.value;
    setNumber(cardNumber);

    setIsCardValid(isCardNumberValid(cardNumber));
    setCardType(getCardNumberType(cardNumber));
  };

  return (
    <div>
      <input type="text" value={number} onChange={handleChange} />
      {number.length > 0 && !isCardValid && <p>Card is not valid!</p>}
      {number.length > 0 && isCardValid && <p>Card is valid.</p>}
      {number.length > 0 && cardType && <p>{cardType}</p>}
    </div>
  );
}

export default CreditCardInput;
