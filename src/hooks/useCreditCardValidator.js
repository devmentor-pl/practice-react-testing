import { useState } from 'react';

const maxCardLength = 16;

const cardTypes = [
    {
        name: 'Visa',
        regex: /^4/,
        length: [13, 16],
    },
    {
        name: 'MasterCard',
        regex: /^5[1-5]/,
        length: [16],
    },
    {
        name: 'American Express',
        regex: /^3[47]/,
        length: [15],
    },
    {
        name: 'Diners Club',
        regex: /^3(?:0[0-5]|[68])/,
        length: [14],
    },
    {
        name: 'JCB',
        regex: /^(?:3088|3096|3112|3158|3337|3528)/,
        length: [16],
    },
];

const useCreditCardValidation = () => {
    const [error, setError] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardProvider, setCardProvider] = useState('');

    const handleChange = e => {
        setCardNumber(e.target.value);
    };

    const validateCard = () => {
        const cleanedNumber = cardNumber.replace(/\s+/g, '');
        if (cleanedNumber === '') setError('input empty');

        const paddedNumber = cleanedNumber.padStart(maxCardLength, '0');
        let sum = 0;
        for (let i = 0; i < maxCardLength; i++) {
            let digit = parseInt(paddedNumber.charAt(i));
            if (i % 2 === 0) digit *= 2;
            sum += digit > 9 ? digit - 9 : digit;
        }

        const isCardValid = sum % 10 === 0;
        return isCardValid;
    };

    const checkProvider = number => {
        const cleanedNumber = number.replace(/\s+/g, '');

        for (const type of cardTypes) {
            if (type.regex.test(cleanedNumber) && type.length.includes(cleanedNumber.length)) {
                return type.name;
            }
        }
        return '';
    };

    const handleSubmit = e => {
        e.preventDefault();
        setError('');

        const isCardValid = validateCard();
        if (!isCardValid) return setError('card number invalid');

        const provider = checkProvider(cardNumber);
        provider ? setCardProvider(provider) : setCardProvider('unknown provider');
    };

    return { handleSubmit, error, cardProvider, handleChange, cardNumber };
};

export default useCreditCardValidation;
