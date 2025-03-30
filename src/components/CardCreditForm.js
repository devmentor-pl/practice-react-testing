import { useState } from "react";

function CardCreditForm() {
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");

  const cardTypes = [
    { name: "Visa", regex: /^4\d{12}(?:\d{3})?$/ },
    { name: "MasterCard", regex: /^5[1-5]\d{14}$/ },
    { name: "American Express", regex: /^3[47]\d{13,14}$/ },
    { name: "Diners Club", regex: /^3(?:0[0-5]|[68])/ },
    { name: "JCB", regex: /^35[2-8]/ },
  ];

  const formattedNumber = (string) => string.padStart(16, "0");

  const getCardType = (number) => {
    for (let card of cardTypes) {
      if (card.regex.test(number)) {
        return setType(card.name);
      }
    }

    return setType("Unknown");
  };

  const isCardValid = () => {
    const cardNumber = formattedNumber(number)
      .split("")
      .map((char) => parseInt(char));

    for (let index = cardNumber.length - 2; index >= 0; index -= 2) {
      if (cardNumber[index] * 2 > 9) {
        cardNumber[index] = cardNumber[index] * 2 - 9;
      } else {
        cardNumber[index] = cardNumber[index] * 2;
      }
    }

    const sum = cardNumber.reduce((acc, cur) => acc + cur, 0);
    return sum % 10 === 0;
  };

  const handleOnChange = (e) => {
    const value = e.target.value;

    if ((/^\d+$/.test(value) || value === "") && value.length <= 16) {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (number && isCardValid()) {
      getCardType(number);
    } else {
      setType("Invalid number");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={number} onChange={handleOnChange} />
      <button>check</button>
      <p>{type && type}</p>
    </form>
  );
}

export default CardCreditForm;
