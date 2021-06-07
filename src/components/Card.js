import React from 'react';
import CreditForm from './CreditForm';

import useValidation from '../hooks/useValidation';

const Card = () => {
    
    // const [ cardIssuer, setCardIssuer ] = useState('');

    const [cardIssuer, error, validateCredit] = useValidation()

    // const validateCredit = (cardNum) => {
    //     const oddDgtSum = cardNum
	// 		.split('')
	// 		.reverse()
	// 		.filter((_, i) => i % 2 !== 1)
    //         .map(d => parseInt(d))
	// 		.reduce((a, b) => a + b);
            
    //     const evenDgtSum = cardNum
	// 		.split('')
	// 		.reverse()
	// 		.filter((_, i) => i % 2 === 1)
	// 		.map(d => (d * 2).toString().split(''))
	// 		.flat()
    //         .map(d => parseInt(d))
    //         .reduce((a, b) => a + b);
        
    //     if ((oddDgtSum + evenDgtSum) % 10 !== 0) {
	// 		setError('Invalid card number');
	// 	}
        
    //     const twoFirstCardDigits = parseInt(cardNum.slice(0, 2));

    //     switch (cardNum.length) {
	// 		case 13:
    //             if (twoFirstCardDigits >= 40 && twoFirstCardDigits < 50) {
    //                 setCardIssuer('VISA')
    //             }
	// 			return;
	// 		case 15:
    //             if (twoFirstCardDigits === 34 || twoFirstCardDigits === 37) {
    //                 setCardIssuer('AmEx')
    //             }
	// 			return;
    //         case 16:
    //             if (twoFirstCardDigits >= 40 && twoFirstCardDigits < 50) {
	// 				setCardIssuer('Visa');
	// 			};
    //             if (twoFirstCardDigits >= 51 && twoFirstCardDigits <= 55) {
    //                 setCardIssuer('MasterCard')
    //             };
    //             return;
	// 		default:
	// 			return;
    //     };
    // }
    
    if (error) {
        return <h1>Invalid card number</h1>;
    }; 

    if (cardIssuer) {
        return <h1>{`Your card is ${cardIssuer}`}</h1>
    };

    return <CreditForm getIssuer={validateCredit}/>
};

export default Card;
