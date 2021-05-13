import React, { useState } from 'react';
import CreditForm from './CreditForm';

const Card = () => {
    const [cardNr, setCardNr] = useState('');
    const [ error, setError ] = useState('');
    const [ cardIssuer, setCardIssuer ] = useState('');

    const validateCredit = (number) => {
        const oddDigitsSum = number
			.split('')
			.reverse()
			.filter((d, i) => i % 2 !== 1)
			.map(d => d.toString().split(''))
            .flat()
            .map(d => parseInt(d))
			.reduce((a, b) => a + b);
            
            const evenDigitsSum = number
            .split('')
            .reverse()
			.filter((d, i) => i % 2 === 1)
			.map(d => (d * 2).toString().split(''))
            .map(d => parseInt(d))
			.reduce((a, b) => a + b);            
        
        console.log('🚀 ~ validateCredit ~ oddDigitsSum', oddDigitsSum)
        console.log('🚀 ~ validateCredit ~ evenDigitsSum', evenDigitsSum)

        const controlSum = oddDigitsSum + evenDigitsSum;    
        
        if (controlSum % 10 !== 0) {
            setError('Invalid card number');
        }
        console.log(controlSum);

        // switch (controlSum) {
        //     case 
                
        //         break;
        
        //     default:
        //         break;
        // }

    };

    // const getCardIssuer = () => {
    //     console.log('getting card issuer');
    // };    
    if (error) {
        return <h1>Wrong card number</h1>
    } 
    return <CreditForm getIssuer={validateCredit}/>
};

export default Card;
