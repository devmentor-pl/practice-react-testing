import React, { useState } from 'react';

const cardProviders = {
  Visa: ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49'],
  MasterCard: ['51', '52', '53', '54', '55'],
  AmericanExpress: ['34', '37'],
  DinersClub: ['30', '36', '38'],
  JCB: ['3088', '3096', '3112', '3158', '3337', '3528'],
};

const getCardType = (number) => {
  let matchedProvider = 'unknown';
  let maxLengthMatch = 0;

  for (const [provider, prefixes] of Object.entries(cardProviders)) {
    const sortedPrefixes = prefixes.sort((a, b) => b.length - a.length);

    for (const prefix of sortedPrefixes) {
      if (number.startsWith(prefix) && prefix.length > maxLengthMatch) {
        matchedProvider = provider;
        maxLengthMatch = prefix.length;
      }
    }
  }

  return matchedProvider;
};

const formatCardNumber = (number) => {
  const cleanNumber = number.replace(/\D/g, '');

  const limitedNumber = cleanNumber.slice(0, 16);

  return limitedNumber.replace(/(.{4})/g, '$1 ').trim();
};

const CreditCardInput = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('unknown');
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    const onlyNums = value.replace(/\D/g, '');

    const detectedType = getCardType(onlyNums);
    let maxLength;
    switch (detectedType) {
      case 'AmericanExpress':
        maxLength = 15;
        break;
      case 'DinersClub':
        maxLength = 14;
        break;
      default:
        maxLength = 16;
    }

    const truncatedNums = onlyNums.slice(0, maxLength);
    const formattedNumber = formatCardNumber(truncatedNums);

    setCardNumber(formattedNumber);
    setCardType(detectedType);

    let cardLengthValid = false;
    switch (detectedType) {
      case 'AmericanExpress':
        cardLengthValid = truncatedNums.length === 15;
        break;
      case 'DinersClub':
        cardLengthValid = truncatedNums.length === 14;
        break;
      default:
        cardLengthValid =
          truncatedNums.length >= 13 && truncatedNums.length <= 16;
    }

    if (detectedType === 'unknown') {
      setValidationMessage('Invalid card provider.');
      setIsValid(false);
    } else if (!cardLengthValid) {
      setValidationMessage(`Wrong length for ${detectedType} card.`);
      setIsValid(false);
    } else {
      setValidationMessage('Card is valid.');
      setIsValid(true);
    }
  };

  const handleSubmit = () => {
    setCardNumber('');
    setIsValid(false);
    setCardType('unknown');
    setSubmissionMessage('Card details were sent, thank you.');
    setTimeout(() => {
      setSubmissionMessage('');
    }, 5000);
  };

  return (
    <section>
      <input
        type="text"
        value={cardNumber}
        onChange={handleCardNumberChange}
        placeholder="Card number"
        maxLength="19"
      />
      {isValid && <button onClick={handleSubmit}>Submit</button>}
      <p>Card type: {cardType}</p>
      <p className={isValid ? 'valid-feedback' : 'invalid-feedback'}>
        {validationMessage}
      </p>
      {submissionMessage && <p>{submissionMessage}</p>}
    </section>
  );
};

export default CreditCardInput;
