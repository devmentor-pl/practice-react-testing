import React, { useState } from "react";

const Card = () => {
    const [cardOrganization, setCardOrganization] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [error, setError] = useState('');

    const changeCardNumber = (e) => {
        setCardNumber(e.target.value.replace(/\D/g, ''));
    }

    const isNumberValid = (fullNumber) => {
        let sum = 0;
        for (let i = fullNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(fullNumber.charAt(i), 10);
        if (i % 2 === fullNumber.length % 2) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        }
        return sum % 10 === 0;
    }

    const checkCardNumber = () => {
        const isValid = isNumberValid(cardNumber);

        if (!isValid) {
        setError('Wrong card number');
        setCardOrganization('');
        return;
        }

        switch (cardNumber.length) {
        case 16:
        case 13:
            setCardOrganization(Number(cardNumber[0]) === 4 ? 'Visa' : '');
            break;
        case 15:
            setCardOrganization('American Express');
            break;
        case 14:
            setCardOrganization('Diners Club Carte Blanche');
            break;
        default:
            setError('Unsupported card number length');
            setCardOrganization('');
        }
    }

    return (
        <div>
        <input
            type="text"
            name="cardNumber"
            value={cardNumber}
            onChange={changeCardNumber}
            maxLength="16"
            placeholder="Enter your card number"
        />
        {error && <p className="error">{error}</p>}
        <p>Organization: {cardOrganization}</p>
        <button onClick={checkCardNumber}>Check</button>
        </div>
    );
};

export default Card;