export function isCardNumberValid(cardNumber) {
  if (/[^0-9-\s]+/.test(cardNumber)) {
    return false;
  }

  let number = cardNumber.replace(/\D/g, "");

  number = number.padStart(16, "0");
  let sum = 0;

  for (let i = 0; i < number.length; i++) {
    const digit = number.charAt(i);

    if (i % 2 === 0) {
      const t = +digit * 2;
      sum += t % 10;
      sum += Math.floor(t / 10);
    } else {
      sum += +digit;
    }
  }

  return sum % 10 === 0;
}

export function getCardNumberType(cardNumber) {
  let number = cardNumber.replace(/\D/g, "");

  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(number)) {
    return "VISA";
  }

  if (/^5[1-5][0-9]{14}$/.test(number) || /^2[2-7][0-9]{14}$/.test(number)) {
    return "MASTERCARD";
  }

  if (/^3[47][0-9]{13}$/.test(number)) {
    return "AMERICAN EXPRESS";
  }

  if (/3(?:0[0-5]|[68][0-9])[0-9]{11}/.test(number)) {
    return "DINERS CLUB";
  }

  if (/^(3(?:088|096|112|158|337|5(?:2[89]|[3-8][0-9]))\d{12})$/.test(number)) {
    return "JCB";
  }

  return "UNKNOWN";
}
