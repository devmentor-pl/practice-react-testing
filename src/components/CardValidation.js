function AmexCardnumber(inputtxt) {
    var cardno = /^(?:3[47][0-9]{13})$/;
    return cardno.test(inputtxt);
  }

  function VisaCardnumber(inputtxt) {
    var cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    return cardno.test(inputtxt);
  }

  function MasterCardnumber(inputtxt) {
    var cardno = /^(?:5[1-5][0-9]{14})$/;
    return cardno.test(inputtxt);
  }

  function DiscoverCardnumber(inputtxt) {
    var cardno = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    return cardno.test(inputtxt);
  }

  function DinerClubCardnumber(inputtxt) {
    var cardno = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
    return cardno.test(inputtxt);
  }

  function JCBCardnumber(inputtxt) {
    var cardno = /^(?:(?:2131|1800|35\d{3})\d{11})$/;
    return cardno.test(inputtxt);
  }

export default function isCardNumberValid(cardNumber) {

    var cardType = null;
    if (VisaCardnumber(cardNumber)) {
      cardType = "visa";
    } else if (MasterCardnumber(cardNumber)) {
      cardType = "mastercard";
    } else if (AmexCardnumber(cardNumber)) {
      cardType = "americanexpress";
    } else if (DiscoverCardnumber(cardNumber)) {
      cardType = "discover";
    } else if (DinerClubCardnumber(cardNumber)) {
      cardType = "dinerclub";
    } else if (JCBCardnumber(cardNumber)) {
      cardType = "jcb";
    }

    return cardType;
  }

  