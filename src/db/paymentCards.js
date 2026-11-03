const paymentCards = [
	{
		name: 'Visa',
		lengths: [16, 13],
		prefixes: ['4'],
	},
	{
		name: 'MasterCard',
		lengths: [16],
		prefixes: ['51', '52', '53', '54', '55'],
	},
	{
		name: 'American Express',
		lengths: [15],
		prefixes: ['34', '37'],
	},
	{
		name: 'Diners Club Carte Blanche',
		lengths: [14],
		prefixes: ['300', '301', '302', '303', '304', '305', '36', '38'],
	},
	{
		name: 'JCB',
		lengths: [16],
		prefixRange: {
			from: 3528,
			to: 3589,
		},
	},
];

export default paymentCards;
