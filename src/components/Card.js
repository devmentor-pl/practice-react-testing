import React from 'react';
import CardForm from './CardForm';

import useValidation from '../hook/useValidation';

const Card = () => {
    const [cardType, error, validateCredit] = useValidation()

    if (error) {
        return <h1>Invalid card number!</h1>;
    }; 

    if (cardType) {
        return <h1>{`Your card is ${cardType}`}</h1>
    };

    return <CardForm getType={validateCredit}/>
};

export default Card;