import { useState } from "react";

const providers = [
  { providerName: "Visa", pattern: /^4[0-9]{15}$/ },
  { providerName: "Visa", pattern: /^4[0-9]{12}$/ },
  { providerName: "MasterCard", pattern: /^5[1-5]{1}[0-9]{14}$/ },
  { providerName: "American Express", pattern: /^3[4|7]{1}[0-9]{13}$/ },
  {
    providerName: "Diners Club Carte Blanche",
    pattern: /^3[0|6|8]{1}[0-9]{12}$/,
  },
];

export const useCardValidator = () => {
  const [cardProvider, setCardProvider] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function checkProvider(cardNumber){
  const [validCardProvider] = providers.filter((provider) =>
    provider.pattern.test(cardNumber)
  );

  if (validCardProvider) {
    setCardProvider(validCardProvider.providerName);
  } else {
    setCardProvider(null);
    setErrorMessage("Podałeś niepoprawny numer karty!");
  }
}

return [checkProvider, cardProvider, errorMessage]
};
