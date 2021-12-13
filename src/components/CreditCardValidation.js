export const create16digitsCardNum = (num) => {
    let cardNum = num;
    if (cardNum.length < 13) {
        console.log("card number needs to have at least 13 digits");
        return;
    }
    if (cardNum.length >= 13 && cardNum.length < 16) {
        cardNum = cardNum.padStart(16, "0");
        return cardNum;
    }
    return cardNum;
};

export const luhnAlg = (num) => {
    return num
        .split("")
        .reverse()
        .map(function (c, i) {
            return (i % 2 === 0 ? 1 : 2) * parseInt(c);
        })
        .join("")
        .split("")
        .map((c) => parseInt(c))
        .reduce(function (sum, c) {
            return (sum += parseInt(c));
        });
};

export const checkCardType = (cardNum) => {
    let visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
    let mastercard = /^5[1-5][0-9]{14}$/;
    let amex = /^3[47][0-9]{13}$/;
    let mastercard2 = /^2[2-7][0-9]{14}$/;
    let diners = /^3[0689][0-9]{12}[0-9]*$/;
    let jcb = /^35[0-9]{14}[0-9]*$/;

    if (visa.test(cardNum)) {
        return "Visa";
    }
    if (mastercard.test(cardNum) || mastercard2.test(cardNum)) {
        return "MasterCard";
    }
    if (amex.test(cardNum)) {
        return "American Express";
    }
    if (diners.test(cardNum)) {
        return "Diners Club Carte Blanche";
    }
    if (jcb.test(cardNum)) {
        return "JBC";
    } else {
        return "not recognized";
    }
};
