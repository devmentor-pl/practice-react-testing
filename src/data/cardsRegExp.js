const cardsRegExp = {
	Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
	MasterCard: /^5[1-5][0-9]{14}$/,
	AmericanExpress: /^3[47]\d{13,14}$/,
	DinersClub: /^3[068][0-9]{12}$/,
	Discover: /^6(?:011|5[0-9]{2})[0-9]{3,}$/
}

export default cardsRegExp
