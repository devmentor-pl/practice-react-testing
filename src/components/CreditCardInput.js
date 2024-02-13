import React, { useState } from 'react';

const cardProviders = {
  Visa: {
    prefixes: ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49'],
    lengthFrom: 13,
    lengthTo: 16,
  },
  MasterCard: {
    prefixes: ['51', '52', '53', '54', '55'],
    lengthFrom: 16,
    lengthTo: 16,
  },
  AmericanExpress: {
    prefixes: ['34', '37'],
    lengthFrom: 15,
    lengthTo: 15,
  },
  DinersClub: {
    prefixes: ['30', '36', '38'],
    lengthFrom: 14,
    lengthTo: 14,
  },
  JCB: {
    prefixes: ['3088', '3096', '3112', '3158', '3337', '3528'],
    lengthFrom: 16,
    lengthTo: 19,
  },
};

const getCardType = (number) => {
  let matchedProvider = 'unknown';
  let maxLengthMatch = 0;

  Object.entries(cardProviders).forEach(([provider, { prefixes }]) => {
    prefixes.forEach((prefix) => {
      if (number.startsWith(prefix) && prefix.length > maxLengthMatch) {
        matchedProvider = provider;
        maxLengthMatch = prefix.length;
      }
    });
  });

  return matchedProvider;
};

const formatCardNumber = (number, maxLength = 16) => {
  const cleanNumber = number.replace(/\D/g, '');
  const limitedNumber = cleanNumber.slice(0, maxLength);
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
    const providerInfo = cardProviders[detectedType];

    const maxLength = providerInfo ? providerInfo.lengthTo : 16;

    const truncatedNums = onlyNums.slice(0, maxLength);
    const formattedNumber = formatCardNumber(truncatedNums, maxLength);

    setCardNumber(formattedNumber);
    setCardType(detectedType);

    let cardLengthValid = false;
    if (providerInfo) {
      cardLengthValid =
        truncatedNums.length >= providerInfo.lengthFrom &&
        truncatedNums.length <= providerInfo.lengthTo;
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
