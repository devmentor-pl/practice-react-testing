import React, { useState } from 'react'

const Credit = () => {
    const [cardNr, setCardNr] = useState('');
    const cardIssuer = 'VISA';
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // do something

        setCardNr('');
    };

    const handleInput = (value) => {
        // console.log('handluj z tym');
        setCardNr(value);
    };

    return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="creditNr">Credit Card Number:</label>
            <p>Min 13, max 19 digits</p>
            <br />
			<input
				id="creditNr"
				type="tel"
				pattern="[0-9\s]{13,19}"
				onChange={e => handleInput(e.target.value)}
				value={cardNr}
			/>
            <p>{cardIssuer}</p>
            <br />
			<button type='submit'>Submit</button>
		</form>
	);
}

export default Credit;
