const cardTypesRegExp = {
	Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
	MasterCard: /^5[1-5][0-9]{14}$/,
	'American Express': /^3[47]\d{13,14}$/,
	'Diners Club': /^3[068][0-9]{12}$/,
	Discover: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
	JCB: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/,
};

export default cardTypesRegExp;
