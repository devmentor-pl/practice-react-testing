const cardTypes = [
    { provider: 'Visa', numberLength: 16, pattern: /^4{1}[0-9]{15}/ },
    { provider: 'Visa', numberLength: 13, pattern: /^4{1}[0-9]{12}/ },
    { provider: 'MasterCard', numberLength: 16, pattern: /^5{1}(1|2|3|4|5){1}[0-9]{14}/ },
    { provider: 'AmericanExpress', numberLength: 15, pattern: /^3{1}(4|7){1}[0-9]{13}/ },
    { provider: 'DCCB', numberLength: 14, pattern: /^3{1}(0|6|8){1}[0-9]{12}/ },
    { provider: 'JCB', numberLength: 16, pattern: /^(3088|3096|3112|3158|3337|3528|3566){1}[0-9]{12}/ },
]

export default cardTypes