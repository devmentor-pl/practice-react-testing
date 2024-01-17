const cardTypes = {
	visa: [4],
	masterCard: [51, 52, 53, 54, 55],
	americanExpress: [34, 37],
	dccb: [30, 36, 38],
	jcb: [3088, 3096, 3112, 3158, 3337, 3528],
};

const weights = [2, 1];

export const validate = (numbers) => {
	if (numbers.length >= 13 && numbers.length <= 16) {
		const card = numbers.split('');
		const cardAlgo = card.map((num, index) => num * weights[index % weights.length]);

		const flattedNumbers = cardAlgo.flatMap((num) => {
			const digits = num.toString().split('').map(Number);
			return digits;
		});
		let cardType = 'unknown';
		const sum = flattedNumbers.reduce((acc, value) => acc + value, 0);
		for (const type in cardTypes) {
			const patterns = cardTypes[type];
			if (Array.isArray(patterns)) {
				for (const pattern of patterns) {
					const patternStr = pattern.toString();
					if (numbers.startsWith(patternStr)) {
						cardType = type;
						break;
					}
				}
			} else {
				if (numbers.startsWith(patterns.toString())) {
					cardType = type;
					break;
				}
			}
		}

		if (sum % 10 === 0) {
			return `karta pochodzi z ${cardType}`;
		} else {
			return 'karta jest nieprawidłowa';
		}
	} else {
		return `nieprawidłowa karta, dlugość znaków karty jest niepoprawna`;
	}
};
