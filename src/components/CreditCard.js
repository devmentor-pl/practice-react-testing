import React, { useState } from "react";

import { useCardValidator } from "../hooks/useValidateCard";

function CreditCard() {
  const [cardNumberInput, setCardNumberInput] = useState("");
  const [checkProvider, cardProvider, errorMessage] = useCardValidator(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    checkProvider(cardNumberInput);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cardNumber">Numer karty:</label>
          <input
            id="cardNumber"
            name="cardNumber"
            value={cardNumberInput}
            onChange={(e) => setCardNumberInput(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {cardProvider ? (
        <p>Dostawca Twojej karty: {cardProvider}</p>
      ) : (
        <small>{errorMessage}</small>
      )}
    </>
  );
}

export default CreditCard;
