import React, { useState } from 'react';

import cardTypesRegExp from '../providers/cardNumberRegExProvider';

const CardVerifier = () => {
	const [cardNumber, setCardNumber] = useState('');
	const [error, setError] = useState('');
	const [type, setType] = useState('');

	function handleChange(e) {
		error && setError('');
		type && setType('');
		const { value } = e.target;
		setCardNumber(value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (cardNumber === '') {
			setError('Proszę wpisać numer karty.');
		} else if (typeof cardNumber !== 'undefined') {
			try {
				const value = cardNumber.replace(/\D/g, '');
				if (isCardNumberValid(value)) {
					detectCardType(value);
				} else {
					setError('Nieprawidłowy numer karty.');
				}
			} catch (error) {
				setError(error.message);
			}
		}
	}

	function detectCardType(value) {
		let anyTypeDetected = false;
		for (const cardType in cardTypesRegExp) {
			if (cardTypesRegExp[cardType].test(value)) {
				setType(cardType);
				anyTypeDetected = true;
			}
		}
		if (!anyTypeDetected) {
			setError('Sprawdź wprowadzony numer karty - nie wykryto typu.');
		}
	}

	function isCardNumberValid(value) {
		if (/[^0-9-\s]+/.test(value)) return false;

		let nCheck = 0,
			bEven = false;

		for (var n = value.length - 1; n >= 0; n--) {
			var cDigit = value.charAt(n),
				nDigit = parseInt(cDigit, 10);

			if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

			nCheck += nDigit;
			bEven = !bEven;
		}

		return nCheck % 10 === 0;
	}

	return (
		<form onSubmit={e => handleSubmit(e)}>
			<p>
				<label>
					Card number:{' '}
					<input
						name="cardNumber"
						value={cardNumber}
						onChange={e => handleChange(e)}
					/>
					{error && <strong>{error}</strong>}
					{type && <strong>Wykryto typ karty: {type}.</strong>}
				</label>
			</p>
			<p>
				<button type="submit">send</button>
			</p>
		</form>
	);
};

export default CardVerifier;
