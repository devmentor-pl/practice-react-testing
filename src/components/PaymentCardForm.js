import React, { useState } from 'react';

import paymentCards from '../db/paymentCards';

const PaymentCardForm = () => {
	const [cardNumber, setCardNumber] = useState('');
	const [error, setError] = useState('');
	const [producer, setProducer] = useState('');

	const detectCard = number => {
		const foundCard = paymentCards.find(card => {
			const validLength = card.lengths.includes(number.length);

			const validPrefix = card.prefixes && card.prefixes.some(prefix => number.startsWith(prefix));

			const firstFourDigits = Number(number.slice(0, 4));

			const validPrefixRange =
				card.prefixRange && firstFourDigits >= card.prefixRange.from && firstFourDigits <= card.prefixRange.to;

			return validLength && (validPrefix || validPrefixRange);
		});
		return foundCard ? foundCard.name : null;
	};

	const validateCard = number => {
		if (!number.trim()) {
			return 'Card number is required';
		}

		if (!/^\d+$/.test(number)) {
			return 'Card number should contain only digits';
		}

		if (number.length < 13) {
			return 'Card number is too short';
		}
		if (number.length > 16) {
			return 'Card number is too long';
		}

		return '';
	};

	const handleSubmit = e => {
		e.preventDefault();

		setError('');
		setProducer('');

		const validationError = validateCard(cardNumber);

		if (validationError) {
			setError(validationError);
			return;
		}

		const cardName = detectCard(cardNumber);

		if (!cardName) {
			setError('Unknown card type');
			return;
		}

		setProducer(cardName);
	};

	return (
		<form onSubmit={handleSubmit}>
			<p>
				<label htmlFor='card'>Card number:</label>
			</p>

			<input
				id='card'
				name='card'
				type='text'
				inputMode='numeric'
				value={cardNumber}
				onChange={e => setCardNumber(e.target.value)}
			/>

			<p>
				<button type='submit'>check</button>
			</p>

			{error && <p role='alert'>{error}</p>}

			{producer && (
				<p>
					Producer: <strong>{producer}</strong>
				</p>
			)}
		</form>
	);
};

export default PaymentCardForm;
