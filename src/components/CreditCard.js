import React from 'react';
import useCreditCardValidation from '../hooks/useCreditCardValidator';



function CreditCard() {
    const { handleSubmit, cardNumber, handleChange, error, cardProvider } = useCreditCardValidation();

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='cardNumber'>Card number:</label>
            <input name='cardNumber' id='cardNumber' value={cardNumber} onChange={handleChange} />
            {error ? <p>{error}</p> : <p>{cardProvider}</p>}
            <button type='submit'>send</button>
        </form>
    );
}

export default CreditCard;

