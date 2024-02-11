import React, { useState } from 'react';

const CreditCard = () => {
	const [cardNumber, setCardNumber] = useState('');
	const [error, setError] = useState('');
	const [cardType, setCardType] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		setError('');

		cardValidator();
	}

	const cardProviders = {
		Visa: ['40', '41', '42', '43', '44', '45'],
		MasterCard: ['51', '52', '53', '54', '55'],
		AmericanExpress: ['34', '37'],
		DinersClub: ['30', '36', '38'],
		JCB: ['35'],
	};

	const cardValidator = () => {
		if (cardNumber === '') {
			setError('Wprowadź numer karty');
		}

		if (!luhnCheck(cardNumber)) {
			setError('Numer karty jest nieprawidłowy');
		} else {
			setCardType(getCardType(cardNumber));
		}
	};

	const luhnCheck = (cardNumber) => {
		let sum = 0;
		let isSecond = false;

		for (let i = cardNumber.length - 1; i >= 0; i--) {
			let digit = parseInt(cardNumber[i], 10);

			if (isSecond) {
				digit *= 2;
				if (digit > 9) {
					digit -= 9;
				}
			}

			sum += digit;
			isSecond = !isSecond;
		}

		return sum % 10 === 0;
	};

	const getCardType = (cardNumber) => {
		const firstTwoDigits = cardNumber.slice(0, 2);

		for (const provider in cardProviders) {
			if (cardProviders[provider].includes(firstTwoDigits)) {
				return provider;
			}
		}

		return 'Nieznany dostawca';
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<p>
					<label htmlFor='cardNumber'>Numer karty:</label>
					<input
						id='cardNumber'
						name='cardNumber'
						value={cardNumber}
						onChange={(e) => setCardNumber(e.target.value)}
					/>
				</p>
				<button type='submit'>Sprawdź</button>
			</form>

			<p>{error ? error : cardType ? `Twoja karta: ${cardType}` : ''}</p>
		</>
	);
};

export default CreditCard;
