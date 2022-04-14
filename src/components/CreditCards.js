import React, { useState } from 'react';
import isCardNumberValid  from './CardValidation';


function CreditCards() {
    const [number, setNumber] = useState("");
    const [cardValid, setCardValid] = useState(false);
    const [cardType, setCardType] = useState(null);

    const handleChange = e => {
        const cardNumber = e.target.value;
        setNumber(cardNumber);

        setCardValid(isCardNumberValid(cardNumber));
        setCardType(isCardNumberValid(cardNumber));
    }

    return (
        <div>
            <input type="text" value={number} onChange={handleChange}/>
            {number.length > 0 && !cardValid && <p>Card is not valid!</p>}
      {number.length > 0 && cardValid && <p>Card is valid.</p>}
      {number.length > 0 && cardType && <p>{cardType}</p>}
        </div>
    )
}

export default CreditCards;