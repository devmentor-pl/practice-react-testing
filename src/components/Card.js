import React from "react";
import { useState } from "react";

const Card = () => {
	const [cardNumber, setCardNumber] = useState("");
	const [cardName, setCardName] = useState("");

	const handleCardNumber = e => {
		const { value } = e.target;
		setCardNumber(value);
	};

	const isCardNumberValid = cardNumber => {
		const digitsArray = cardNumber.split(" ").map(Number);
		digitsArray.reverse();

		for (let i = 1; i < digitsArray.length; i += 2) {
			let multipliedDigit = digitsArray[i] * 2;

			if (multipliedDigit > 9) {
				multipliedDigit = multipliedDigit - 9;
			}
			digitsArray[i] = multipliedDigit;
		}
		const finalSum = digitsArray.reduce((acc, curr) => acc + curr, 0);
		return finalSum % 10 === 0;
	};

	const checkCardName = cardNumber => {
		if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) return "Visa";
		if (/^5[1-5][0-9]{14}$/.test(cardNumber)) return "MasterCard";
		if (/^3[47][0-9]{13}$/.test(cardNumber)) return "American Express";
		if (/^3[068][0-9]{12}$/.test(cardNumber))
			return "Diners Club Carte Blanche";
		if (/^(3088|3096|3112||3158||3337|3528)[0-9]{12}$/.test(cardNumber))
			return "JCB";
		return "Not supported bank card!";
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (isCardNumberValid(cardNumber)) {
			const card = checkCardName(cardNumber);
			setCardName(card);
		} else {
			setCardName("Your card is not valid");
		}
		setCardNumber("");
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Card number
					<input
						name='cardNumber'
						type='text'
						value={cardNumber}
						onChange={e => handleCardNumber(e)}
					/>
				</label>
				<button>check the card</button>
			</form>
			<p>{cardName}</p>
		</>
	);
};

export default Card;
