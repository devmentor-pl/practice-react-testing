import { useState } from "react";

const providers = {
  4: "VISA",
  51: "MasterCard",
  52: "MasterCard",
  53: "MasterCard",
  54: "MasterCard",
  55: "MasterCard",
  34: "American Express",
  37: "American Express",
};

const useCardValidator = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [provider, setProvider] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  function updateCard(cardNumber) {
    setCardNumber(cardNumber);
    checkProvider(cardNumber);
    validate(cardNumber);
  }

  function validate(cardNumber) {
    const sum = getSumOdd(cardNumber) + getSumEven(cardNumber);
    if (sum % 10 === 0) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }

  function checkProvider(cardNumber) {
    setProvider(null);
    const keys = Object.keys(providers);
    for (let i = 0; i < keys.length; i++) {
      console.log(cardNumber.indexOf(keys[i], keys[i], i));
      if (cardNumber.indexOf(keys[i]) === 0) {
        setProvider(providers[keys[i]]);
        break;
      }
    }
  }

  function getSumOdd(cardNumber) {
    return cardNumber
      .split("")
      .reverse()
      .filter((_, index) => index % 2 !== 1)
      .map((item) => parseInt(item))
      .reduce((acc, curr) => acc + curr, 0);
  }

  function getSumEven(cardNumber) {
    return cardNumber
      .split("")
      .reverse()
      .filter((_, index) => index % 2 === 1)
      .map((item) => (item * 2).toString().split(""))
      .flat()
      .map((num) => parseInt(num))
      .reduce((acc, curr) => acc + curr, 0);
  }

  return [updateCard, cardNumber, isCorrect, provider];
};

export default useCardValidator;
