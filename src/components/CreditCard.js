import React, { useState } from "react";

const CreditCard = () => {
  const [number, setNumber] = useState("");
  const [cardName, setCardName] = useState();

  const clickHandler = (e) => {
    const { value } = e.target;
    setNumber(value);
  };

  const checkCardName = (num) => {
    let newStr = num.replace(/^0+/, "");

    if (
      (newStr.length === 16 || newStr.length === 13) &&
      newStr.charAt(0) === "4"
    ) {
      setCardName("Visa");
    } else if (
      newStr.length === 16 &&
      newStr.charAt(0) === "5" &&
      (newStr.charAt(1) === "1" ||
        newStr.charAt(1) === "2" ||
        newStr.charAt(1) === "3" ||
        newStr.charAt(1) === "4" ||
        newStr.charAt(1) === "5")
    ) {
      setCardName("Mastercard");
    } else if (
      newStr.length === 15 &&
      newStr.charAt(0) === "3" &&
      (newStr.charAt(1) === "4" || newStr.charAt(1) === "7")
    ) {
      setCardName("American Express");
    }
  };

  const isNumberCorrect = (number) => {
    const arr = number.split("").map(Number);

    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (i % 2 === 0) {
        newArray.push(2 * arr[i]);
      } else {
        newArray.push(1 * arr[i]);
      }
    }

    const digits = newArray.join("").split("");
    let sum = 0;
    digits.forEach((num) => {
      sum = sum + Number(num);
      return sum;
    });

    if (sum % 10 === 0) {
      checkCardName(number);
      return true;
    } else {
      return false;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let newNumber = number;
    if (newNumber.length < 16) {
      for (let i = number.length; i < 16; i++) {
        newNumber = "0" + newNumber;
      }

      isNumberCorrect(newNumber);
    }
    if (number.length === 16) {
      isNumberCorrect(newNumber);
    } else {
    }
  };
  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <input
        type="number"
        value={number}
        onChange={(e) => {
          clickHandler(e);
        }}
      ></input>
      <p>Card name: {cardName}</p>
      <button type="submit">check</button>
    </form>
  );
};

export default CreditCard;
