import React from 'react'

const CreditForm = () => {
    return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='creditNr'>Credit Card Number:</label>
			<p>Min 13, max 19 digits</p>
			<br />
			<input
				id='creditNr'
				type='tel'
				pattern='[0-9\s]{13,19}'
				onChange={e => handleInput(e.target.value)}
				value={cardNr}
			/>
			<p>{cardIssuer}</p>
			<br />
			<button name='submit' type='submit'>
				Submit
			</button>
		</form>
	);
}

export default CreditForm
