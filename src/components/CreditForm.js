import React, { useState } from 'react';

const CreditForm = ({getIssuer}) => {
console.log('🚀 ~ CreditForm ~ getIssuer', getIssuer)

	const [cardNr, setCardNr] = useState('');
	const [cardIssuer, setCardIssuer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        getIssuer(cardNr);

        setCardNr('');
    };

    const handleInput = (value) => {

        setCardNr(value);
    };

    return (
		<form onSubmit={ handleSubmit }>
			<label htmlFor="creditNr">Credit Card Number:</label>
            <br />
			<input
				id="creditNr"
				type="tel"
				pattern="[0-9\s]{13,19}"
                placeholder="13-16 digits"
				onChange={ e => handleInput(e.target.value) }
				value={ cardNr }
			/>
            <p>{ cardIssuer }</p>
            <br />
			<button name="submit" type='submit'>Submit</button>
		</form>
	);
};

export default CreditForm
