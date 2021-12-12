import React from 'react';
import CreditForm from './CreditForm';

import useValidation from '../hooks/useValidation';

const Card = () => {
    const [cardIssuer, error, validateCredit] = useValidation()

    if (error) {
        return <h1>Invalid card number</h1>;
    }; 

    if (cardIssuer) {
        return <h1>{`Your card is ${cardIssuer}`}</h1>
    };

    return <CreditForm getIssuer={validateCredit}/>
};

export default Card;
