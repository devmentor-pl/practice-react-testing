import React, { useState } from 'react';

import { validate } from '../helpers/validate';

const CreditCard = () => {
	const [inptVal, setInptVal] = useState('');
	const [result, setResult] = useState('');

	const handleClick = () => {
		const validationResult = validate(inptVal.trim());
		setResult(validationResult);
	};

	return (
		<>
			<p>Wprowadź numer karty</p>
			<p>3066231231233301 dccb</p>
			<p>4866231231233301 visa</p>

			<label htmlFor=''>
				<input
					name='card'
					type='text'
					onChange={(e) => setInptVal(e.target.value)}
				/>
				<button onClick={() => handleClick(inptVal)}>check</button>
			</label>
			{result && <p>{result}</p>}
		</>
	);
};

export default CreditCard;
