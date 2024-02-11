import React, {useState} from "react";

const BankAccount = () => {

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    const cardValidation = (cardNumber) => {
        const cards = [
            { reg: /(5[1-5]{1}[0-9]{14})/, length: 16, cardName: 'Mastercard' },
            { reg: /(3[4,7]{1}[0-9]{13})/, length: 15, cardName: 'American Express' },
            { reg: /(4[0-9]{12})/, length: 13, cardName: 'Visa' },
            { reg: /(4[0-9]{15})/, length: 15, cardName: 'Visa' },
            { reg: /(3[0,6,8]{1}[0-9]{12})/, length: 14, cardName: 'Diners Club Carte Blanche' },
        ];
        const [validCard] = cards.filter(card => card.reg.test(cardNumber) && card.length === cardNumber.length);
        validCard ? setCardName(validCard.cardName) : setErrorMessage('Wrong card number');
    }

    const handleChange = (e) => {
        setCardNumber(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setCardName(null);
        setErrorMessage(null)
        cardValidation(cardNumber);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="cardNumber">Card number:
                <input data-testid="inputCardNumber" name="cardNumber" id="cardNumber" type='number' value={cardNumber} onChange={handleChange} ></input>
            </label>
            <div>
                {cardName ? <span>{cardName}</span> : <span>{errorMessage}</span>}
            </div>
            <button>Check!</button>
        </form>
    )
}

export default BankAccount;