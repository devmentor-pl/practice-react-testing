import React, {useState} from 'react';

const Card = () => {
	const [cardNumber, setCardNumber] = useState('');
	const [isValid, setIsValid] = useState('');
	const [cardProvider, setCardProvider] = useState('');

	const handleCardNumber = (e) => {
		const {value} = e.target;
		const checkRegNumber = /[0-9]/;

		if(checkRegNumber.test(value) && cardNumber.length <= 16) {
			setCardNumber(value);
		} else {
			setIsValid('Card number should be lower or equal 16 digits!');
			setCardNumber('');
		}
	}

	const resetInput = () => {
		setCardNumber('');
	}

	const validationCardNumber = (cardNumber) => {
			const oddSum = cardNumber
				.split('')
				.reverse()
				.filter((_, i) => i % 2 !== 1)
				.map(d => parseInt(d))
				.reduce((a, b) => a + b);

			const evenSum = cardNumber
				.split('')
				.reverse()
				.filter((_, i) => i % 2 === 1)
				.map(d => (d * 2).toString().split(''))
				.flat()
				.map(d => parseInt(d))
				.reduce((a, b) => a + b);

			if ((oddSum + evenSum) % 10 !== 0) {
				setIsValid('Incorrect card number!');
			}

			const getFirstTwoDigits = parseInt(cardNumber.slice(0, 2));

			switch (cardNumber.length) {
				case 13:
					if (getFirstTwoDigits >= 40 && getFirstTwoDigits < 50) {
						setCardProvider('Visa');
						setIsValid('Valid!')
					}
					return;
				case 15:
					if (getFirstTwoDigits === 34 || getFirstTwoDigits === 37) {
						setCardProvider('American Express');
						setIsValid('Valid!')
					}
					return;
				case 16:
					if (getFirstTwoDigits >= 40 && getFirstTwoDigits < 50) {
						setCardProvider('Visa');
						setIsValid('Valid!')
					}
					if (getFirstTwoDigits >= 51 && getFirstTwoDigits <= 55) {
						setCardProvider('MasterCard');
						setIsValid('Valid!')
					}
					return;
				default:
					return;
			}
	};

	const submitCardChecker = (e) => {
		e.preventDefault();
		validationCardNumber(cardNumber);
	}

	return (
		<>
			<h1>Card number checker</h1>
			<form onSubmit={submitCardChecker}>
				<label>Card number:
					<input type="number" name="cardNumber" value={cardNumber} onChange={handleCardNumber}/>
				</label>
				<button type="submit">submit</button>
				<button type="reset" onClick={resetInput}>reset</button>
			</form>
			<div>
				<p>Card number is: {isValid}</p>
				<p>Card number provider: {cardProvider}</p>
			</div>
		</>
	);
};

export default Card;