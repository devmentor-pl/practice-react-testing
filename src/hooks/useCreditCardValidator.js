import { useState } from "react";

const providers = {
    '4': 'VISA',
    '51': 'MasterCard',
    '52': 'MasterCard',
    '53': 'MasterCard',
    '54': 'MasterCard',
    '55': 'MasterCard',
    '34': 'American Express',
    '37': 'American Express',
    '30': 'Diners Club Carte Blanche',
    '36': 'Diners Club Carte Blanche',
    '38': 'Diners Club Carte Blanche',
    '3088': 'JCB',
    '3096': 'JCB',
    '3112': 'JCB',
    '3158': 'JCB',
    '3337': 'JCB',
    '3528': 'JCB',
}

const useCreditCardValidator = () => {
    const [cardNum, setCardNum] = useState('')
    const [provider, setProvider] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    function udpateCardNumber(cardNum) {
        setCardNum(cardNum);
        checkProvider(cardNum);
        validate(cardNum)
    }

    function validate(cardNum) {
        const sum = getSumOdd(cardNum) + getSumEven(cardNum);
        if (sum % 10 === 0) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    }

    function checkProvider(cardNum) {
        setProvider(null);

        const keys = Object.keys(providers);
        for (let i = 0; i < keys.length; i++) {
            if (cardNum.indexOf(keys[i]) === 0) {
                setProvider(providers[keys[i]]);
                break;
            }
        }
    }

    function getSumOdd(cardNum) { // nieparzyste
        return cardNum
            .split('')
            .reverse()
            .filter((_, i) => i % 2 !== 1)
            .map(s => parseInt(s))
            .reduce((acc, curr) => acc + curr, 0);
    }

    function getSumEven(cardNum) { // parzyste
        return cardNum
            .split('')
            .reverse()
            .filter((_, i) => i % 2 === 1)
            .map(s => (s * 2).toString().split('')) // [..., 9, ...] => 9 * 2 => '18' => ['1', '8']
            .flat() // [..., ['1', '8'], ...] => [..., '1', '8', ...]
            .map(d => parseInt(d))
            .reduce((acc, curr) => acc + curr, 0);
    }


    return [udpateCardNumber, cardNum, isCorrect, provider];
}

export default useCreditCardValidator;