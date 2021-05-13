import React, { useState } from 'react';
import CreditForm from './CreditForm';

const Card = () => {
    const [ error, setError ] = useState('');
    const [ cardIssuer, setCardIssuer ] = useState('');

    const validateCredit = (number) => {

        const oddDgtSum = number
			.split('')
			.reverse()
			.filter((d, i) => i % 2 !== 1)
            .map(d => parseInt(d))
			.reduce((a, b) => a + b);
            
        const evenDgtSum = number
			.split('')
			.reverse()
			.filter((d, i) => i % 2 === 1)
			.map(d => (d * 2).toString().split(''))
			.flat()
            .map(d => parseInt(d))
            .reduce((a, b) => a + b);

        
        console.log('🚀 ~ validateCredit ~ oddDigitsSum', oddDgtSum);
        console.log('🚀 ~ validateCredit ~ evenDigitsSum', evenDgtSum);

        // const controlSum = oddDigitsSum + evenDigitsSum;    
        
        // if (controlSum % 10 !== 0) {
        //     setError('Invalid card number');
        // }
    };

    if (cardIssuer) {
        return <h1>`Your card is ${cardIssuer}`</h1>
    }
    if (error) {
        return <h1>Wrong card number</h1>
    } 
    return <CreditForm getIssuer={validateCredit}/>
};

export default Card;
